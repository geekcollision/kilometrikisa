'use strict';

var request = require('request');
var cheerio = require('cheerio');
var range = require('annomath').range;


module.exports = main;

function main(cb) {
    var url = 'http://www.kilometrikisa.fi/teams/';

    request.get(url, function(err, _, data) {
        if(err) {
            return cb(err);
        }

        cb(null, scrape(data));
    });
}

main.scrape = scrape;

function scrape(data) {
    var $ = cheerio.load(data);
    var last = $('ul li.arrow').prev().find('a').attr('href');
    var pageNumber = last.split('=').slice(1)[0].split('&')[0];

    return range(1, pageNumber + 1).map(function(v) {
        return 'http://www.kilometrikisa.fi/teams/?page=' + v;
    });
}
