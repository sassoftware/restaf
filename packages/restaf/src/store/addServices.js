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

import iaddServices from './iaddServices';

import { API_XSRF } from '../actionTypes';
import appData from './appData';
import getServiceRoot from './getServiceRoot';

async function addServices (store, ...services) {
    debugger;
    if (services.includes('casManagement')) {
        services.push('casProxy');
    }
  
    // loop for initialized services
    let subList = [];
    let ifolder = {};
    services.map(s => {
        ifolder[ s ] = getServiceRoot(store, s);
        if (ifolder[ s ] === null) {
            subList.push(s);
        }
    });

    // initialize new services
    if (subList.length > 0) {
        let { folders, xsrfTokens } = await iaddServices(store, subList);
        for (let service in xsrfTokens) {
            appData(store, API_XSRF, service, xsrfTokens[ service ]);
        }
        // merge new ones into preloaded list
        for (let s in folders) {
            ifolder[ s ] = folders[ s ];
        }


    }
    return ifolder;

}

export default addServices;