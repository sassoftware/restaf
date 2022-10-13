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

/* import uuid from 'uuid' ;*/
let Immutable = require('immutable');
const { Map, fromJS } = Immutable;

import { VIYA_LOGON_COMPLETE, BEGIN_LOGON, VIYA_LOGOFF, VIYA_LOGON_SERVER, VIYA_LOGON_IMPLICIT, VIYA_LOGOFF_COMPLETE,
        KEEP_ALIVE, BEGIN_LOGOFF} from '../actionTypes';
import { setGoodStatus, setBadStatus, statusInfoStruct } from '../utils';

let  initialState = fromJS(
    {
        connections      : [],
        user             : 'none',
        type             : 'server',
        currentConnection: -1,
        statusInfo       : statusInfoStruct(),
        runStatus        : 'idle'
    }

);

function viyaLogon (state = initialState, action) {

    switch (action.type) {

        case BEGIN_LOGON: {
            return  state.set('runStatus', 'busy');
        }

        case VIYA_LOGON_SERVER: {
            let config    = action.payload.iconfig;
            let newOne = {
				type     : 'server',
				id       : 1,
				user     : 'You',
				desc     : 'Server',
				logonInfo: {
					type      : 'server',
					host      : config.host,
                    protocol  : (config.host.indexOf('https') !== -1) ? 'https://' : 'http://',
                    ns        : config.ns, /* namespace of viya */
					tokenType : config.hasOwnProperty('tokenType') === true ? config.tokenType : null,
					token     : config.hasOwnProperty('token') === true ? config.token : null,
                    sslOptions: config.hasOwnProperty('sslOptions') === true ? config.sslOptions : null,
                    
                    // the next two are here for backward compatability but sslOptions is the correct way

					pem               : config.hasOwnProperty('pem') ? config.pem : null,
					rejectUnauthorized: config.hasOwnProperty('rejectUnauthorized') ? config.rejectUnauthorized : null,

					withCredentials: config.hasOwnProperty('withCredentials') ? config.withCredentials : true,
					keepAlive      : config.hasOwnProperty('keepAlive') ? config.keepAlive : null,
				},
			};

            let temp = {
                currentConnection: state.get('currentConnection') +  1,
                runStatus        : 'ready',
                statusInfo       : {},
                user             : 'You of course!',
                connections      : [newOne]
            };

            return fromJS(temp);
        }
        case VIYA_LOGON_IMPLICIT: {
            let config    = action.payload.iconfig;

            if (action.error === true) {
                return state.withMutations(s => {
                    s.set('runStatus', 'error').set('statusInfo', fromJS(setBadStatus(action.payload)));
                });
            }
            let newOne = {
                type     : 'implicit',
                id       : 1,
                user     : 'You',
                desc     : 'implicit',
                logonInfo: { ...config}
                };
            
            let temp = {
                currentConnection: state.get('currentConnection') +  1,
                runStatus        : 'ready',
                statusInfo       : {},
                user             : 'You of course!',
                connections      : [newOne]
            };

            return fromJS(temp);
        }

        case VIYA_LOGON_COMPLETE: {

            if (action.error === true) {
                return state.withMutations(s => {
                    s.set('runStatus', 'error').set('statusInfo', fromJS(setBadStatus(action.payload)));
                });
            }
            let temp = {
                currentConnection: state.get('currentConnection') +  1,
                runStatus        : 'ready',
                statusInfo       : setGoodStatus(action.payload),
                user             : action.payload.data.iconfig.user
            };
            
            return state.withMutations (s => {
                //noinspection JSUnresolvedFunction
                s.set('connections', s.get('connections').push(Map(newConnection(action.payload))))
               .merge(fromJS(temp));
            });
        }

        case VIYA_LOGOFF: {
           return state;
        }

        case BEGIN_LOGOFF: {
            return  state.set('runStatus', 'busy');
        }
        case VIYA_LOGOFF_COMPLETE: {
            if (action.error === true) {
                return state.withMutations(s => {
                    s.set('runStatus', 'error').set('statusInfo', fromJS(setBadStatus(action.payload)));
                });
            
            }
            return initialState;
        }

        case KEEP_ALIVE: {
            return state;
        }
        
        default:
            return state ;
    }

}

function newConnection (payload) {
    let { results, iconfig } = payload.data;
    
    return {
        type     : 'connection',
        id       : 1,
        user     : iconfig.user,
        desc     : iconfig.desc,
        logonInfo: {
            type     : 'trusted',
            host     : iconfig.host,
            tokenType: results['token_type'],
            token    : results[ 'access_token' ],
            
            sslOptions: iconfig.sslOptions,

            // rejectUnauthorized: (iconfig.hasOwnProperty('rejectUnauthorized')) ? iconfig.rejectUnauthorized : null,
            
            keepAlive: (iconfig.keepAlive == null) ? null : iconfig.keepAlive
        },
        statusInfo: setGoodStatus(payload)
    };

}
export default viyaLogon;