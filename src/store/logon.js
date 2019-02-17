
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

import { VIYA_LOGON,  VIYA_LOGON_SERVER, VIYA_LOGON_IMPLICIT } from '../actionTypes';

import qs from 'query-string';
const logon = (store, ipayload) => {
    return new Promise((resolve, reject) => {

        let unSubscribe;
        let action;
        let implicitLogon = false;

        let payload = (ipayload == null) ? null : { ...ipayload };

        if (store.getState().connections.get('currentConnection') >= 0) {
            resolve('ready');
        } else {
            let logonExit = () => {
                let newState = store.getState().connections;
                let runStatus = newState.get('runStatus');
                if (runStatus === 'ready') {
                    unSubscribe();
                    resolve(runStatus);
                } else if (runStatus === 'error') {
                    unSubscribe();
                    reject(newState.get('statusInfo').toJS());
                }
            };

            if (payload == null) {
                // Assume proxy condition
                payload = {
                    host    : `${window.location.protocol}//${window.location.host}`,
                    authType: VIYA_LOGON_SERVER
                };

                // Now check and see if we are in the callback for implicit flow
                if (window != null && window.location != null && window.location.hasOwnProperty('hash')) {
                    let windowLocation = window.location;
                    let host = qs.parse(windowLocation.search);
                    let loc  = qs.parse(windowLocation.hash);
                    
                    //
                    if (host !== null && host.host !== null){
                        payload.host      = host.host;
                        //noinspection JSUnresolvedVariable
                        payload.tokenType = (host.token_type != null) ? host.token_type : null;
                        //noinspection JSUnresolvedVariable
                        payload.token     = (host.access_token != null) ? host.access_token : null;
                        if (payload.token !== null) {
                            payload.authType = VIYA_LOGON_IMPLICIT;
                        }
                    }
                    //
                    //noinspection JSUnresolvedVariable
                    if (loc.access_token != null) {
                        payload = {
                            host     : host.host,
                            token    : loc['access_token'],
                            tokenType: loc['token_type'],
                            authType : VIYA_LOGON_IMPLICIT
                        };
                    }
                }
            }

            // now make the final decision

            switch (payload.authType) {

                case VIYA_LOGON_SERVER:
                    if (payload.host == null) {
                        payload.host = `${window.location.protocol}//${window.location.host}`;
                    }
                    
                    break;

                case VIYA_LOGON_IMPLICIT:
                    if (!payload.hasOwnProperty('token')) {
                        implicitLogon = true;
                        getToken(payload);
                        resolve('Implicit Call');
                    }
                    break;

                case "LOGOFF":
                    break;

                default:
                    break;
            }

            if (!implicitLogon) {
                action = {
                    type   : (payload.authType === 'LOGOFF') ? 'LOGOFF' : VIYA_LOGON,
                    payload: { ...payload }
                };
                unSubscribe = store.subscribe(logonExit);
                store.dispatch(action);
            }
        }

    });
};


function getToken (payload) {
    let x = `${payload.host}/SASLogon/oauth/authorize?response_type=token&client_id=${payload.clientID}`;
    //noinspection JSUnresolvedVariable
    if (payload.redirect != null) {
        //noinspection JSUnresolvedVariable
        let redirectUri = `${window.location.protocol}//${window.location.host}/${payload.redirect}?host=${payload.host}`;
        x = `${x}&redirect_uri=${redirectUri}`
    }
    window.location.replace(x);
}

export default logon;

