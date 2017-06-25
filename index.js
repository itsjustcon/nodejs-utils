'use strict';
/**
 * index.js
 * --------
 *
 * @flow
 */

module.exports = {
    DeferredPromise: require('./src/promise-deferred'),
    definePassthrough: require('./src/define-passthrough'),
    file: require('./src/file'),
    Hooks: require('./src/hooks'),
    isObservable: require('./src/isObservable'),
    isPlainObject: require('./src/isPlainObject'),
    isPromise: require('./src/isPromise'),
    indent: require('./src/indent'),
    logError: require('./src/logError'),
    once: require('./src/once'),
    pretty: require('./src/pretty'),
    promisifyEvent: require('./src/promisifyEvent'),
    getImports: require('./src/get-imports'),
};
