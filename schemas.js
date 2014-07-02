'use strict';

var sugar = require('object-sugar');
var schema = sugar.schema();


schema(module.exports, 'Team').fields({
    position: Number,
    name: String,
    kmAvg: Number,
    kmTotal: Number,
    activeDays: Number,
    gasSaving: Number,
    co2Saving: Number,
    chainReaction: Number
});
