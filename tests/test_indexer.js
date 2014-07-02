#!/usr/bin/env node
'use strict';

var assert = require('assert');
var fs = require('fs');

var scrape = require('../lib/indexer').scrape;


tests();

function tests() {
    fs.readFile('./data/index.html', {
        encoding: 'utf8'
    }, function(err, d) {
        if(err) {
            return console.error(err);
        }

        var res = scrape(d);

        assert.equal(res[0], 'http://www.kilometrikisa.fi/teams/?page=1');
        assert.equal(res.length, 480);
    });
}
