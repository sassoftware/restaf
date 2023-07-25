/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
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

import request from './request';
import getServices from './getServices';
import getXsrfData from './getXsrfData';
import selectLogonInfo from './selectLogonInfo';
import {KEEP_ALIVE} from '../actionTypes';

async function keepViyaAlive (store,aliveURL,interval, timeout, onTimeout) {
    let keepTimer = setInterval(() => {
        ikeepViyaAlive(store, aliveURL);
    }, interval*1000);

    setTimeout(() => { 
        console.log('Note: Stopping keepViyaAlive');
        clearInterval(keepTimer);
        if (onTimeout != null) {
            onTimeout();
        } else {
            let host = selectLogonInfo(store.getState()).host;
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
            console.log('timeout');
			window.open(`${host}/SASLogon/timedout`, 'Timed Out', params);
        }
    }, timeout*1000);
    return true;
}
async function ikeepViyaAlive (store, aliveURL) {
    if (aliveURL !== null) {
        let payload = {
            url    : aliveURL,
            method : 'GET',
            headers: {
                Accept: '*/*',
            },
        };
        let action = {
            type   : KEEP_ALIVE,
            route  : 'keepAlive',
            payload: payload
        };
        if (aliveURL !== true) {
           store.dispatch(action);
        }
    }

	// This keeps the app server session alive

	let services = getServices(store);

	let host = selectLogonInfo(store.getState()).host;
	// This keeps the services alive with their xsrf tokens valid
	
	for (let i = 0; i < services.length; i++) {
		let s = services[i];
		if (s.indexOf('_') === -1) {
			if (s.indexOf('cas-http') === -1) {
                let ixsrf = getXsrfData(store, s);
                /* could be initialization state if null or have no xsrf */
                if (ixsrf !== null) {
                    let xsrfHeaderName = ixsrf['x-csrf-header'];

                    let payload = {
                        url            : `${host}/${s}/`,
                        Accept         : 'application/json, application/vnd.sas.api+json',
                        withCredentials: true,
                        method         : 'GET',
                        xsrfHeaderName : xsrfHeaderName,
                        headers        : {},
                    };
                    payload.headers[xsrfHeaderName] = ixsrf['x-csrf-token'];
                    await request(store, payload);
                     let action = {
							type   : KEEP_ALIVE,
							route  : 'keepAlive',
							payload: payload,
						};
						store.dispatch(action);
                }
            }
		}
	}
	return true;
}

export default keepViyaAlive;
