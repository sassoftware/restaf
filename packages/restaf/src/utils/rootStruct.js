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

import {APP_DATA_ROOT, API_STATUS_ROOT, API_XSRF_ROOT} from '../actionTypes';
function tLinkStruct (name, type, service) {
    if (service === APP_DATA_ROOT || service === API_STATUS_ROOT || service === API_XSRF_ROOT){
        return {
            structType: service,
            type      : service,
            route     : service,
            routeList : [],
            userData  : {}
        };
    }
    let relPath = {
        structType: type,
        type      : type,
        title     : name,
        method    : 'GET', /* for cmd tLinks - useful in UI */
        iconfig   : {},    /* input config */
        payload   : {},
        statusInfo: statusInfoStruct(),
        runStatus : 'idle',

        parentRoute: '',
        route      : '',

        resultType: '',
        links     : {}, /* same structures */
       /*  cmds      : {}, */
        scrollCmds: {}, /* same structure */
        paginator : false,
        itemsList : [],
        items     : [], /* items Struct */
        details   : {},

        stateEvent: null,

        responseHeaders: {},

        link: null,
        raw : {}
    };

    if (arguments.length === 3) {
        relPath.link = {
            method: 'GET',
            title : service,
            href  : '/' + service + '/',
            rel   : 'root',
            type  : 'application/vnd.sas.api',
            uri   : '/' + service + '/'
        };
        relPath.route = `${service}:/${service}`;
        relPath.parentRoute = service;
    }

    return relPath;
}

/* also for info */

function itemsStruct () {

    return {
        name      : '',
        type      : '',
        resultType: '',
        cmds      : null,
        data      : null
    };
}

function statusInfoStruct () {
   return  {
       status    : 0,
       statusText: ' ',
       error     : false,
       details   : ' '
   };

}

export { tLinkStruct, itemsStruct, statusInfoStruct };

