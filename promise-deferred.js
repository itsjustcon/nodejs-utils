'use strict';
/**
 * promise-deferred.js
 * -------------------
 *
 * @flow
 */

const Promise = require('bluebird');

/*::
type resolveHandler = (value: ?any) => void
type rejectHandler = (error: Error) => void

type DeferredPromise = Promise & {
    resolve: (value: ?any) => void,
    reject: (error: Error) => void,
}
*/



function defer() /*: { promise: Promise, resolve: resolveHandler, reject: rejectHandler }*/ {
    let resolve, reject;
    const promise = new Promise((...args) => [ resolve, reject ] = args);
    return { promise, resolve, reject };
}

function DeferredPromise() /*: DeferredPromise*/ {
    const { promise, resolve, reject } = defer();
    Object.defineProperties(promise, {
        resolve: { value: resolve },
        reject: { value: reject },
    });
    return promise;
}

module.exports = DeferredPromise;
module.exports.defer = defer;
