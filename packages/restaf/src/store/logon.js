/* eslint-disable no-prototype-builtins */

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

import { VIYA_LOGON, VIYA_LOGOFF, VIYA_LOGON_SERVER, VIYA_LOGON_IMPLICIT, VIYA_LOGON_PASSWORD, VIYA_LOGON_TOKEN }
        from '../actionTypes';

import qs from 'qs';
import parse from 'url-parse';
import keepViyaAlive from './keepViyaAlive';

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
                    if (ipayload != null && ipayload. keepAlive != null) {
                        let interval = 300;
                        let timeout  =  14400;
                        if (ipayload.timers != null) {
                            let timers = ipayload.timers;
                            if (typeof timers === 'string') {
                                let opts = timers.split(',');
								interval = parseInt(opts[ 0 ]);
                                timeout  = parseInt(opts[ 1 ]);
                            } else {
                                interval = timers[0];
                                timeout  = timers[1];
                            }
                        }
                        keepViyaAlive (store, ipayload.keepAlive,interval, timeout, ipayload.onTimeout) 
                    }
                    resolve(runStatus);
            } else if (runStatus === 'error') {
                unSubscribe();
                reject(newState.get('statusInfo').toJS());
            }
        };
    
            //
            // check url if not password (no window) or when payload is null
            // this allows users of restaf-server|viya-appserverjs to LOGONPAYLOAD unconditionally to logon
            //
            
        
            if (payload === null || payload.authType === VIYA_LOGON_IMPLICIT) {
                urlInfo = parseUrlNext();
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
                case 'code'          :
                case VIYA_LOGON_TOKEN:
                case VIYA_LOGON_SERVER:
                    if (payload.host == null) {
                        payload.host = `${window.location.protocol}//${window.location.host}`;
                    } 
                    
                    break;

                case VIYA_LOGON_IMPLICIT:
                    if (payload.hasOwnProperty('token') === false) {
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
                action.payload.sslOptions = store.config.hasOwnProperty('sslOptions') ? store.config.sslOptions : null;
                /*
                action.payload.pem = (store.config.hasOwnProperty('pem')) ? store.config.pem : null;
                action.payload.rejectUnauthorized = (store.config.hasOwnProperty('rejectUnauthorized')) ? store.config.rejectUnauthorized : null;
                */
                unSubscribe = store.subscribe(logonExit);
                // store.config.casProxy = false; preset to this value in initStore.
                action.storeConfig = store.config;
                if (payload.authType === VIYA_LOGON_SERVER) {
                    if (payload.hasOwnProperty('token') !== true) {
                        store.config.casProxy = true;
                    } 
                }
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

function parseUrlNext () {
    if (window == null) {
        return null;
    }

    let url = parse(window.location, true);
    let loc = qs.parse(url.hash);
    let q = url.query;
    if (q.host == null || loc.access_token == null) {
        return null;
    }

    let tokenType = 'bearer';

    if (loc['#token_type'] != null) {
        tokenType = loc['#token_type'];
    } else if (loc['token_type'] != null) {
        tokenType = loc['token_type'];
    }
    let payload = {
       host     : q.host,
       authType : VIYA_LOGON_IMPLICIT,
       tokenType: tokenType,
       token    : loc.access_token
    };
    return payload;
}



export default logon;

