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

'use strict';

import configureSagaStore from './configureSagaStore';
import {APP_DATA_ROOT, API_STATUS_ROOT, APP_DATA, API_XSRF} from '../actionTypes';

import apiCall         from './apiCall';
import apiCallAll      from './apiCallAll';
import runAction       from './runAction';
import apiSubmit       from './apiSubmit';
import jobState        from './jobState';
import jobStateAll     from './jobStateAll';
import request         from './request';
// import jobStatus    from './jobStatus';
import getServices     from './getServices';
import addServices     from './addServices';
import getServiceRoot  from './getServiceRoot';
import logon           from './logon';
import logoff          from './logoff';
import endStore        from './endStore';
import routeToObj      from './routeToObj';
import selectLogonInfo from './selectLogonInfo';
import appData         from './appData';
import getXsrfData     from './getXsrfData';
import deleteRafObject from './deleteRafObject';
import keepViyaAlive   from './keepViyaAlive';
/**
 * @description Initialize a restaf store
 * @category restaf/core
 * @module initStore
 * @param {object=} config configuration object(future)
 * @returns {store} restaf store object(rafObject)
 * @example
 *    let store = restaf.initStore();
 *    The store object manages all the data and access
 *    to Viya using the REST API. 
 */
function initStore (iconfig) {
    let config = { casProxy: false };
    if (iconfig != null) {
        config = { ...config, ...iconfig };
    }
    let store = configureSagaStore(config);
    
    return  {
        logon     : logon.bind(null, store),
        connect   : logon.bind(null,store),
        logoff    : logoff.bind(null, store),
        disconnect: logoff.bind(null,store),
        connection: loggedOn.bind(null, store),

        addServices: addServices.bind(null, store),
        getServices: getServices.bind(null, store),

        apiCall   : apiCall.bind(null, store),
        runAction : runAction.bind(null, store),
        apiCallAll: apiCallAll.bind(null, store),
        rafObject : routeToObj.bind(null, store),

        getService: routeToObj.bind(null, store),

        deleteRafObject: deleteRafObject .bind(null, store),

        jobState   : jobState.bind(null, store),
        jobStateAll: jobStateAll.bind(null, store),

        submit      : apiSubmit.bind(null, store),
        submitStatus: getApiStatus.bind(null, store),

        setAppData: appData.bind(null, store, APP_DATA),
        getAppData: getAppData.bind(null, store),   

        setXsrfData: appData.bind(null, store, API_XSRF),
        getXsrfData: getXsrfData.bind(null, store), 


        getState: store.getState,
        endStore: endStore.bind(null, store),
        store   : store,
        config  : {...config},

        getServiceRoot: getServiceRoot.bind(null, store),

        request: request.bind(null, store),
        
        keepViyaAlive: keepViyaAlive.bind(null, store)
    }; }

function loggedOn (store) {
    return   selectLogonInfo(store.getState());
}

function getAppData (store, ...args){
    let list = store.getState()[APP_DATA_ROOT];
    let path = (args.length > 0) ? ['userData'].concat(args) : ['userData'];
    return list.getIn(path, null);
}

function getApiStatus (store, jobContext){
    let list   = store.getState()[API_STATUS_ROOT];
    let result = null;
    if (!jobContext) {
        result = list.get('routeList');
    } else {
        let r = list.getIn(['userData', jobContext], null);
        if (r !== null) {
            result     = r.toJS();
            result.job = routeToObj(store, result.route);
        }
    }
    return result;
}
export default initStore;
