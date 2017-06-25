'use strict';
/**
 * once.js
 * -------
 *
 * @flow
 */

function once(fn/*: Function*/) /*: Function*/ {
    if (typeof fn !== 'function') {
        throw new TypeError('Expected a function');
    }
    return function(...args) {
        let result;
        if (fn) {
            result = fn.apply(this, args);
            fn = undefined;
        }
        return result;
    }
}

module.exports = once;
