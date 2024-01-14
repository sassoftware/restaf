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

import iapiCall from './iapiCall';

import { API_CALL, API_XSRF, API } from '../actionTypes';
import appData from './appData';
import readXsrfData from './readXsrfData';
import getXsrfData from './getXsrfData';

/**
 * @description make an api call to viya
 * @module apiCall
 * @category restaf/core
 * @param {rafLinkeRel} iroute 
 * @param {*} payload 
 * @param  {...any} rest 
 * @returns {promise} returns a rafObject
 */
async function apiCall ( store, iroute, payload, ...rest ) {
// const  apiCall =  ( store, iroute, payload, ...rest ) => {
  debugger;
  let response = await iapiCall( store, iroute, API_CALL, payload, ...rest );
  debugger;
  let newXsrf = readXsrfData(response.headers, response.usedService, iroute.route);
  if (newXsrf['x-csrf-header'] != null || newXsrf['tkhttp-id'] != null) {
    appData( store, API_XSRF, response.usedService, newXsrf);
  }
  if (newXsrf['tkhttp-id'] != null) {
    appData( store, API_XSRF, 'tkhttpid', newXsrf);
  }
  
  return response;
};

export default apiCall;