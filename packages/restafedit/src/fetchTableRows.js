/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import {casFetchRows} from '@sassoftware/restaflib';
import prepFormData from "./prepFormData";
/**
 * @description Fetch new records based on control argument
 * @async
 * @module fetchTableRows
 * @param {fetchControl} control - info for records to retrieve
 * @param {appEnv} appEnv - appEnv
 * @returns {promise}  - { data:data, columns:ecolumns, pagination: pagination} 
 * @examples
 *   let control = {from: 10, count:50, format: false};
 *   let r = await fetchTableRows(control, appEnv);
 *   r is a fetchResult object
 */
async function fetchTableRows (control, appEnv) {
    let {store, session} = appEnv;
    // eslint-disable-next-line no-useless-catch
    let c   = {...control};
    if (c.table == null) {
        c.table = appEnv.appControl.dataControl.table;
    }
    if (c.where == null) {
        c.where = {};
    }
    
    let r = await casFetchRows(store, session, c);
    let t = await prepFormData(r.data, appEnv);
    
    appEnv.state = {
        modified   : [],
        pagination : {...r.pagination},
        currentPage: c,
        data       : [],
        columns    : []
    };

    if (appEnv.appControl.dataControl.cachePolicy === true) {
       appEnv.state.data = t.data;
       appEnv.state.columns = t.columns;
    }

    t.pagination = {...r.pagination};
    return t;
        
}
export default fetchTableRows;
