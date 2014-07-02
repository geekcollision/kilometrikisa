'use strict';

var async = require('async');
var spyder = require('spyder');
var sugar = require('object-sugar');

var indexer = require('../lib/indexer');
var scraper = require('../lib/scraper');
var Team = require('../schemas').Team;


module.exports = scrape;

function scrape(cb) {
    spyder({
        initializer: function(o, cb) {
            console.log('Starting to update data');

            cb();
        },
        indexer: function(o, cb) {
            indexer(cb);
        },
        scraper: function(o, url, cb) {
            scraper(url, cb);
        },
        onError: function(o, err) {
            cb(err);
        },
        onResult: function(o, teams, cb) {
            async.each(teams, function(team, cb) {
                sugar.getOrCreate(Team, {
                    name: team.name
                }, function(err, d) {
                    if(err) {
                        return cb(err);
                    }

                    sugar.update(Team, d._id, team, cb);
                });
            }, cb);
        },
        onFinish: function() {
            console.log('Updated data');

            cb();
        }
    });
}
