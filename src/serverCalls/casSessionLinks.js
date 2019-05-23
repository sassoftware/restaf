/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = function casSessionLinks (uri, urihttp, casHttp, server){
 
    return  [
        {
            method        : 'POST',
            href          : `${uri}/actions`,/* payload: data:...., qs: {action: ...} */
            rel           : 'casproxy',
            uri           : `${uri}/actions`,
            responseType  : 'application/json',
            type          : 'application/json',
            itemType      : 'application/json',
            title         : 'Run CAS Action',
            customHandling: 'casExecute',
            casHttp       : casHttp,
            server        : server,
            extended      : true
        },
        {
           method        : 'POST',
           href          : `${urihttp}/actions`,/* payload: data:...., qs: {action: ...} */
           rel           : 'execute',
           uri           : `${urihttp}/actions`,
           responseType  : 'application/json',
           type          : 'application/json',
           itemType      : 'application/json',
           title         : 'Run CAS Action',
           customHandling: 'casExecute',
           casHttp       : casHttp,
           server        : server,
           extended      : true
       },
        {
            method        : 'GET',
            href          : `${uri}/isIdle`, /* need to convert true/false to busy and completed */
            rel           : 'state',
            uri           : `${uri}/isIdle`,
            responseType  : 'application/json',
            type          : 'application/json',
            itemType      : 'application/json',
            title         : 'state',
            customHandling: 'casState',
            casHttp       : casHttp,
            server        : server,
            extended      : true
        }
    ];
}
