'use strict';
/**
 * isPlainObject.js
 * ----------------
 *
 * @flow
 */

function isPlainObject(obj/*: any*/) /*: boolean*/ {
    if (typeof obj !== 'object') return false;
    const proto = Object.getPrototypeOf(obj);
    return (proto === null) || (
        proto
        && proto.constructor === Object
        && proto.constructor instanceof proto.constructor
    );
}

module.exports = isPlainObject;
