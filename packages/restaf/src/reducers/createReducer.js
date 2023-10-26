/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
  'use strict';
import {combineReducers} from 'redux';

import baseReducer from './baseReducer';
import viyaLogon   from './viyaLogon';

import {APP_DATA_ROOT, API_STATUS_ROOT, API_XSRF_ROOT} from '../actionTypes';

const createReducer = ( asyncReducer ) => {

    let reducerList = {};
    reducerList['connections'] = viyaLogon;
    reducerList[API_STATUS_ROOT] = baseReducer( API_STATUS_ROOT );
    reducerList[APP_DATA_ROOT]   = baseReducer( APP_DATA_ROOT );
    reducerList[API_XSRF_ROOT]   = baseReducer( API_XSRF_ROOT );
  
    reducerList = {...reducerList, ...asyncReducer};
    return combineReducers ( reducerList );

};
export default createReducer;

