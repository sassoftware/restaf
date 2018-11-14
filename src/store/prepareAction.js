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

let Immutable = require('immutable');

import getResults   from './getResults';
import getXsrfData from './getXsrfData';

const prepareAction = function (store, iroute, actionType, payload, delay,
                                eventHandler, parentRoute, jobContext) {
    let paginator;
    let route;
    let link;
    let serviceName;
    let current;

    if (typeof iroute === 'string') {
        current = getResults(store, iroute);
        route   = iroute;
    } else {
        current = iroute;
        route   = current.get('route');
    }

    if (current === null || Immutable.Iterable.isIterable(current) === false) {
        return null;
    }
    /* */
    paginator = current.get('paginator');
    link      = current.get('link').toJS();

    if (paginator) {
        route = current.get('parentRoute');
        serviceName = route.split(':/')[0];
    } else {
        let searchPath = route.split(':/');
        serviceName = searchPath [0];

        searchPath.splice(1, 0, store.apiCallNo);
        route = searchPath.join(':/');

        store.apiCallNo++;
    }
    let action = {
        type        : actionType,
        delay       : (delay == null) ? 0 : delay,
        paginator   : paginator,
        serviceName : serviceName,
        route       : route,
        eventHandler: eventHandler,
        parentRoute : parentRoute,
        jobContext  : jobContext,
        link
    } ;

    if ( link.href.indexOf('casProxy') >= 0 ) {
        serviceName = 'casProxy';
    }
    
    let xsrfHeader = getXsrfData(store, serviceName);
   
    if (payload != null) {
        action.payload = payload;
    }
    if ( xsrfHeader !== null ) {
        
        if ( payload != null ) {
            action.payload.xsrf = xsrfHeader;
         } else {
            action.payload = {xsrf: xsrfHeader};
        }
    
    }
    
    return action; 


};
export default prepareAction;