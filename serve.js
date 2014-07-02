#!/usr/bin/env node
'use strict';

require('log-timestamp');

var express = require('express');
var rest = require('rest-sugar');
var sugar = require('object-sugar');
var taskist = require('taskist');

var config = require('./config');
var schemas = require('./schemas');
var tasks = require('./tasks');


main();

function main() {
    serve();

    taskist(config.tasks, tasks, {
        instant: function(err) {
            if(err) {
                return console.error(err);
            }
        }
    });
}

function serve() {
    var app = express();
    var port = config.port;

    app.configure(function() {
        app.set('port', port);

        app.use(express.logger('dev'));

        app.use(app.router);
    });

    app.configure('development', function() {
        app.use(express.errorHandler());
    });

    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');

        next();
    });

    var api = rest(app, '/api/v1', {
        teams: schemas.Team
    }, sugar);

    api.pre(function() {
        api.use(rest.only('GET'));
    });

    process.on('exit', terminator);

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
    'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
    ].forEach(function(element) {
        process.on(element, function() { terminator(element); });
    });

    app.listen(port, function() {
        console.log('%s: Node (version: %s) %s started on %d ...', Date(Date.now() ), process.version, process.argv[1], port);
    });
}

function terminator(sig) {
    if(typeof sig === 'string') {
        console.log('%s: Received %s - terminating Node server ...',
            Date(Date.now()), sig);

        process.exit(1);
    }

    console.log('%s: Node server stopped.', Date(Date.now()) );
}
