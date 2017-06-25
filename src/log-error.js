'use strict';
/**
 * log-error.js
 * ------------
 *
 * @flow
 */

const util = require('util');

const chalk = require('chalk');

function logError(...args/*: Array<Error|string|object|any>*/) {
    const strings = args.map((arg) => (typeof arg === 'string') ? arg : util.format(arg));
    //console.error(err);
    //console.error(chalk.red(util.format(err)));
    console.error(chalk.red(strings.join(' ')));
}

module.exports = logError;
