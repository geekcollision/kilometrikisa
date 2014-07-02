'use strict';

var spyder = require('spyder');
var sugar = require('object-sugar');

var Team = require('../schemas').Team;


module.exports = scrape;

function scrape(cb) {
    spyder({
        initializer: function(o, cb) {
            console.log('Starting to update data');

            cb();
        },
        indexer: function(o, cb) {
            // TODO
            cb(null, []);
        },
        scraper: function(o, url, cb) {
            // TODO
            cb();
        },
        onError: function(o, err) {
            cb(err);
        },
        onResult: function(o, job, cb) {
            // TODO: write to db
            cb();
        },
        onFinish: function() {
            console.log('Updated data');

            cb();
        }
    });
}
