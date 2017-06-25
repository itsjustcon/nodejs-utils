'use strict';
/**
 * index.js
 * --------
 *
 * @flow
 */

module.exports = {
    DeferredPromise: require('./src/promise-deferred'),
    file: require('./src/file'),
    isObservable: require('./src/isObservable'),
    isPlainObject: require('./src/isPlainObject'),
    isPromise: require('./src/isPromise'),
    indent: require('./src/indent'),
    logError: require('./src/logError'),
    once: require('./src/once'),
    pretty: require('./src/pretty'),
};
