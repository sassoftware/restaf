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

import responseReducer  from './responseReducer';
import { ADD_SERVICE, API_CALL, API_POLL, APP_DATA, API_STATUS , DELETE_RAF_OBJECT, API_XSRF} from '../actionTypes';

let Immutable    = require ('immutable');
const { fromJS } = Immutable;

import { tLinkStruct } from '../utils/rootStruct';

const baseReducer = (root) => (state = fromJS(tLinkStruct(root, 'links', root)), action) => {
    
        switch(action.type) {

            case DELETE_RAF_OBJECT: {
                let searchPath = action.route.split(':/');
                let path       = searchPath.slice(1);
                let parent     = state.getIn(path);
                let newState   = state.deleteIn(path);
                return newState;
            }

            case root + '_' + ADD_SERVICE + '_BEGIN': {

                return state.set('runStatus', 'busy').set('route', root);
            }

            case root + '_' + ADD_SERVICE + '_COMPLETE': {

                let result = responseReducer(action, [ root ]);
                result.resultType = 'application/vnd.sas.api';
                result.raw = {...action.payload};
                result.responseHeaders = {...result.raw.headers};
                result.route = root;  // Need this for potential routing
                return fromJS(result);
            }

            case root + '_' + API_CALL + '_BEGIN'    :
            case root + '_' + API_POLL + '_BEGIN'    : {
                //noinspection JSUnresolvedVariable

                let {config} = action;
                let paginator = config.paginator;
                let searchPath = config.route.split(':/');
                let path = searchPath.slice((paginator === true) ? 1 : 2);
                let parent = state.getIn(path);

                // let payload    = {...config.payload };
                // delete payload.route;
                // parent = parent.set( 'runStatus', 'busy' ).set( 'payload', fromJS( payload ) );

                parent = parent.set('runStatus', 'busy');
                path = searchPath.slice(1);
                return state.setIn(path, parent);
            }

            case root + '_' + API_CALL + '_COMPLETE':
            case root + '_' + API_POLL + '_COMPLETE': {
                /* */
                //noinspection JSUnresolvedVariable

                let {config} = action;

                let searchPath = config.route.split(':/');
                let path = searchPath.slice(1);

                let raw    = Object.assign({}, action.payload);
                let result = responseReducer(action, searchPath);
                result.raw = raw;

                if (result.type === 'links' && result.resultType == undefined) {
                    result.resultType = 'application/vnd.sas.api';
                }

                let method   = action.config.link.method;
                result.title = action.config.link.href;

                result.responseHeaders = {...raw.headers};

                result.route  = searchPath.join(':/');
                let newParent = fromJS(result);
                let nState    = state.setIn(path, newParent);
                return (nState);
            }

            case root + '_' + APP_DATA + '_SETSTATE'  : {
                let {route, payload} = action.payload;
                let userData = state.get('userData');
                if (Array.isArray(route)) {
                    userData = userData.setIn(route, fromJS(payload));
                } else {
                    userData = userData.set(route, fromJS(payload));
                }
                return state.set('userData', userData);
            }

            case root + '_' + API_XSRF + '_SETSTATE'  : {
                
                let {route, payload} = action.payload;
                let userData = state.get('userData');
                if (Array.isArray(route)) {
                    userData = userData.setIn(route, fromJS(payload));
                } else {
                    userData = userData.set(route, fromJS(payload));
                }
                return state.set('userData', userData);
            }
            case root + '_' + API_STATUS + '_SETSTATE': {

                let {payload}  = action.payload;
                let jobContext = payload.jobContext;
                let userData   = state.get('userData');
                let routeList  = state.get('routeList').push(jobContext);
                userData       = userData.set(jobContext, fromJS(payload));
                return state.set('userData', userData).set('routeList', routeList);

            }

            default: {
                return state;

            }

        }
    };

export default baseReducer  ;