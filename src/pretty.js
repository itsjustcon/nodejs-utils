'use strict';
/**
 * pretty.js
 * ---------
 */

const util = require('util');

//const moment = require('moment');
const supportsColor = require('supports-color');

function pretty(...args) {
    return args
        //.map((arg) => moment.isMoment(arg) ? arg.toDate() : arg)
        .map((arg) => util.inspect(arg, { colors: supportsColor }))
        //.map((arg) => (typeof arg === 'string') && args.length > 1 ? arg : util.inspect(arg, { colors: supportsColor }))
        .join(' ')
}

module.exports = pretty;
