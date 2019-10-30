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

let unSubscribe;
import { VIYA_LOGOFF } from '../actionTypes';

function logoff (store) {
    //noinspection JSUnusedLocalSymbols
    return new Promise((resolve, reject) => {
        let action = {
            type   : VIYA_LOGOFF,
            payload: {}   
        };
        let logoffExit = () => {
            let newState = store.getState().connections;
            let runStatus = newState.get('runStatus');
                if (runStatus === 'idle') {
                    unSubscribe();
                    resolve(runStatus);
                } else if (runStatus === 'error') {
                    unSubscribe();
                    reject(newState.get('statusInfo').toJS());
                }
        };

        unSubscribe = store.subscribe(logoffExit);
        store.dispatch(action);

    });
}
export default logoff;