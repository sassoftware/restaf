
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



import { VIYA_LOGON, VIYA_LOGOFF, VIYA_LOGON_SERVER, VIYA_LOGON_IMPLICIT, VIYA_LOGON_PASSWORD }
        from '../actionTypes';

import qs from 'query-string';
const logon = (store, ipayload) => {
    return new Promise((resolve, reject) => {

        let unSubscribe;
        let action;
        let implicitLogon = false;
        let urlInfo = null;

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
    
            //
            // check url if not password (no window) or when payload is null
            // this allows users of restaf-server to LOGONPAYLOAD unconditionally to logon
            //
            
            if (payload === null || payload.authType !== VIYA_LOGON_PASSWORD) {
                urlInfo = parseUrl();
                if (payload !== null && urlInfo !== null) {
                    payload = {...payload, ...urlInfo};
                }
            }

            if (payload == null) {
                if (urlInfo !== null) {
                    payload = urlInfo;
                } else {
                    payload = {
                        host    : `${window.location.protocol}//${window.location.host}`,
                        authType: VIYA_LOGON_SERVER
                    };
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
                    type   : (payload.authType === 'LOGOFF') ? VIYA_LOGOFF : VIYA_LOGON,
                    payload: { ...payload }
                };
                action.payload.pem = (store.config.hasOwnProperty('pem')) ? store.config.pem : null;
                action.payload.rejectUnauthorized = (store.config.hasOwnProperty('rejectUnauthorized'))? store.config.rejectUnauthorized : null;
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
        x = `${x}&redirect_uri=${redirectUri}`;
    }
    window.location.replace(x);
}

// only parse for implicit callback
function parseUrl () {
    let payload = null;
    debugger;
    if (window != null && window.location != null && window.location.hasOwnProperty('hash')) {
        let windowLocation = window.location;
        let host = qs.parse(windowLocation.search);
        let loc  = qs.parse(windowLocation.hash);
        
        if (loc.access_token == null) {
            return null;
        }
        //
        payload = {};
        if (host !== null && host.host !== null){
            payload.host      = host.host;
            //noinspection JSUnresolvedVariable
            payload.tokenType = (loc.token_type != null) ? loc.token_type : null;
            //noinspection JSUnresolvedVariable
            payload.token     = (loc.access_token != null) ? loc.access_token : null;
            if (payload.token !== null) {
                payload.authType = VIYA_LOGON_IMPLICIT;
            }
        }
        //
      /*
        payload = {
            host     : host.host,
            token    : loc['access_token'],
            tokenType: loc['token_type'],
            authType : VIYA_LOGON_IMPLICIT
        };
        */
        
    } 
    
    return payload;
}

export default logon;

