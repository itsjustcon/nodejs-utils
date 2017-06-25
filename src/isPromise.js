'use strict';
/**
 * isPromise.js
 * ------------
 *
 * @flow
 */

function isPromise(value/*: any*/) /*: boolean*/ {
    return (
        value != void 0
        && typeof value === 'object'
        && typeof value['then'] === 'function'
    );
}

module.exports = isPromise;
