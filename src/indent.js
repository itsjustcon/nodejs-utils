'use strict';
/**
 * indent.js
 * ---------
 *
 * @flow
 */

function indent(str/*: string*/, level/*: number*/ = 1) /*: string*/ {
    if (typeof str === 'number') [ level, str ] = [ str, level ];
    if (typeof level !== 'number') level = 1;
    return (str || '').replace(/^/gm, '  '.repeat(level));
}

module.exports = indent;
