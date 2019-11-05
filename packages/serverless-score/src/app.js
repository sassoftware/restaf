/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */
'use strict';

let fs       = require("fs");
let path     = require('path');
let setError = require('../lib/setError');

module.exports.app  = async function () {
    let id = 'index';
    let h = await ht(id); 
    let r = {
        statusCode: 200,
        headers   : { 'Content-Type': 'text/html' },
        body      : h
    }
    return r;
}
function ht (id) {
    return new Promise((resolve, reject) => {
        let indexPath = path.resolve (__dirname, `../public/${id}.html`);
        fs.readFile(indexPath, 'utf8', (err, data) => {
            if (err) {
                reject(setError(JSON.stringify(err)))
            } else {
                resolve(data);
            }
        });
    });
} 

