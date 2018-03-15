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

let fs = require('fs');

module.exports = function config (defEnv) {

    console.log(process.argv [ 2 ]);
    let appEnv = (process.argv[ 2 ]  == null) ? defEnv : process.argv[ 2 ];
    let data = fs.readFileSync(appEnv, 'utf8');
    let d = data.split(/\r?\n/);
    console.log('Configuration specified via restaf.env');
    d.forEach(l => {
        if (l.length > 0 && l.indexOf('#') === -1) {
            let la = l.split('=');
            if (la.length > 0) {
                process.env[la[0]] = la[1];
                console.log(`${la[0]}=${la[1]}`)
            }
        }
    });
    process.env.SAS_PROTOCOL = (process.env.SAS_SSL_ENABLED === 'YES') ? 'https://' : 'http://';

    return {
        authType    : 'password',
        host        : `${process.env.SAS_PROTOCOL}${process.env.VIYA_SERVER}`,
        user        : process.env['USER'],
        password    : process.env['PASSWORD'],
        clientID    : process.env['CLIENTID'],
        clientSecret: (process.env.hasOwnProperty('CLIENTSECRET')) ? process.env[ 'CLIENTSECRET' ] : ''
        };

}