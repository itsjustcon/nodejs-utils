'use strict';
/**
 * get-imports.js
 * --------------
 *
 * @flow
 */

const path = require('path');

const _ = require('lodash');

function getImports(_module/*: object*/) /*: Array<string>*/ {
    const $paths = _.sortBy(_module.paths, _.size).reverse();
    const $modules = [], $files = [];
    for (const i = 0; i < _module.children.length; i++) {
        const $module = _module.children[i];
        const $modulePath = $paths.find(($path) => $module.id.startsWith($path));
        if ($modulePath)
            $modules.push(path.relative($modulePath, $module.id).split(path.sep)[0]);
        else $files.push('./' + path.relative(process.cwd(), $module.id));
    }
    //return _.compact(modules).sort();
    //[ $modules, $files ] = [ $modules, $files ].map(_.compact).map(_.sortBy);
    //return [ ...$modules, ...$files ];
    return [ ..._.compact($modules).sort(), ..._.compact($files).sort() ];
}

module.exports = getImports;
