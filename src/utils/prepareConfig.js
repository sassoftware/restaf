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

const  prepareConfig = function (connection, iconfig) {

    console.log('-------------------------------------------------------------------------------');
    console.log('Input configuration');
    console.log(JSON.stringify(iconfig, null, 4));
    console.log('-------------------------------------------------------------------------------');

     let config = {
        method : iconfig.method,
        url    : (iconfig.href.indexOf('http') === -1) ? connection.host + iconfig.href : iconfig.href,
        headers: {}
        };
    config.auth[ connection.tokenType ] = connection.token ;

    let type = fullType(iconfig.type);
    config.headers.Accept = type;
    if (iconfig.hasOwnProperty('responseType')) {
        config.headers[ 'Content-Type' ] = type ;
        config.headers[ 'Accept' ]       = fullType(iconfig.responseType);
    }

    if (iconfig.hasOwnProperty('qs')) {
        config.qs = Object.assign({}, iconfig.qs);
    }

    if (iconfig.hasOwnProperty('data')) {
        config.body = iconfig.data ;
    }

    return(config);

};

function fullType (type) {
    let ntype = type;
    if ((ntype === undefined || ntype === null)) {
        ntype = null;
    } else {
        if (ntype.indexOf('application/') !== -1) {
            if (ntype.indexOf('json') === -1) {
                ntype = type + '+json';
            }
        }
    }
    return (ntype);
}

export default prepareConfig;