/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */
'use strict';
let getSecrets = require('./getSecrets');

 module.exports = async function getLogonPayload (inParms) {
     let secrets = await getSecrets(inParms);
     let payload = {
         authType    : 'password',
         host        : secrets.VIYA_SERVER,
         user        : secrets.USER,
         password    : secrets.PASSWORD,
         clientID    : secrets.CLIENTID,
         clientSecret: (secrets.CLIENTSECRET == null) ? '' : secrets.CLIENTSECRET
     };

    
     if (inParms.hasOwnProperty('test') === true) {
         if ( inParms.hasOwnProperty('token') === true) {
            let test = inParms.test;
            let payload = {
                authType : 'server',
                host     : test.host,
                token    : test.token,
                tokenType: 'bearer'
            }
        } else { 
            payload = {...payload, ...inParms.test};
         }
     }
     // console.log(payload);
     return payload;
 }