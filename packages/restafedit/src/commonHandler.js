/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @description Run init, main or term handlers
 * @async
 * @function commonHandler
 * @param {string} type   - type of exit (init|main|term)
 * @param {rowObject} data        - rowObject
 * @param {number} rowIndex    - client-side Row Index
 * @param {appEnv} appEnv      - app Environment from setup
 * @returns {promise}     - [data, status]
 */
async function commonHandler (type, data, rowIndex, appEnv){
   const {handlers} = appEnv.appControl.editControl;
    if (handlers[type] == null) {
      
       return [data, { status: 0, msg: null}];
    }
    else {
      
      let [newDataRow, status] = await handlers[type](data, rowIndex, appEnv, type);
      return [newDataRow, status];
    }
  };
  export default commonHandler;