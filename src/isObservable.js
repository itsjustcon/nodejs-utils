'use strict';
/**
 * isObservable.js
 * ---------------
 *
 * @flow
 */

try {
    require('rxjs/symbol/observable');
} catch (err) {}

function isObservable(value/*: any*/) /*: boolean*/ {
    return (value != void 0 && (Symbol.observable in value));
}

module.exports = isObservable;
