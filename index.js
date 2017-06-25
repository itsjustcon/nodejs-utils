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
    once: require('./src/once'),
    pretty: require('./src/pretty'),
    getImports: require('./src/get-imports'),
    logError: require('./src/log-error'),
    promisifyEvent: require('./src/promisify-event'),
};
