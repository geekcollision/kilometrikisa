#!/usr/bin/env node
'use strict';

var assert = require('assert');
var fs = require('fs');

var scrape = require('../lib/scraper').scrape;


tests();

function tests() {
    fs.readFile('./data/index.html', {
        encoding: 'utf8'
    }, function(err, d) {
        if(err) {
            return console.error(err);
        }

        var res = scrape(d);

        console.log(res[0]);

        assert.equal(res[0].position, 1);
        assert.equal(res[0].name, 'Utajärven Pantterit');
        assert.equal(res.length, 50);
    });
}
