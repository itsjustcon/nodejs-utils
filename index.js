'use strict';
/**
 * index.js
 * --------
 *
 * @flow
 */

const file = require('./src/file');
const isObservable = require('./src/isObservable');
const isPlainObject = require('./src/isPlainObject');
const isPromise = require('./src/isPromise');

module.exports = {
    file,
    isObservable,
    isPlainObject,
    isPromise,
};
