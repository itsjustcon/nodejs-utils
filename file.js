'use strict';
/**
 * file.js
 * -------
 */

const fs = require('fs');

function fileExists(filepath) {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.constants.F_OK, (err) => {
            resolve(err ? false : true);
        });
    });
}

module.exports = {
    fileExists,
    exists: fileExists,
}
