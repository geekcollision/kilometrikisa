'use strict';

var request = require('request');
var cheerio = require('cheerio');


module.exports = main;

function main(url, cb) {
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
    var ret = [];

    $('table tbody tr').each(function(i, e) {
        var $tds = $(e).find('td');

        ret.push({
            position: parseInt($($tds[0]).text().trim(), 10),
            name: $($tds[1]).find('a').text().trim(),
            kmAvg: parseInt($($tds[2]).text(), 10),
            kmTotal: parseInt($($tds[3]).text(), 10),
            activeDays: parseInt($($tds[4]).text(), 10),
            gasSaving: parseInt($($tds[5]).text(), 10),
            co2Saving: parseInt($($tds[6]).text(), 10),
            chainReaction: parseInt($($tds[7]).text().trim() || 0, 10)
        });
    });

    return ret;
}
