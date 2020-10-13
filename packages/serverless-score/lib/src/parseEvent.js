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

module.exports = async function parseEvent (event) {

    let _appEnv_ = await parseJSON(event.body);
   
    return _appEnv_;

}
function parseJSON (data) {
    //noinspection JSUnusedLocalSymbols
    return new Promise((resolve, reject) => {
        if ( data === null ) {
            resolve({});
        } else if (typeof data === 'object') {
            resolve(data);
        } else {
            // let temp = data.replace(/\r?\n|\r/g, ' ');
            try {
               let odata = JSON.parse(data);
                resolve(odata);
            } catch (err) {
                reject({Error: 'Unable to parse the input JSON', data: data});
            }
        }
    });
}

/*
    if ( _appEnv_.hasOwnProperty('table') === false) {
        _appEnv_.table = {
            caslib: "",
            name  : ""
        }
    };

    if ( _appEnv_.hasOwnProperty('model') === false) {
        _appEnv_.model = {
            caslib: "",
            name  : "",
            source: "ds"
        }
    };
    */

    // console.log(_appEnv_);