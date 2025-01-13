/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import isStdObject from './isStdObject.js';

/**
 * @description Run init, main or term handlers
 * @async
 * @private
 * @module commonHandler
 * @category restafedit/core
 * @param {string} type   - type of exit (init|main|term)
 * @param {rowObject} data        - rowObject
 * @param {number} rowIndex    - client-side Row Index
 * @param {appEnv} appEnv      - app Environment from setup
 * @returns {promise}     - [data, status]
 * @example
 * The function returns the updated data and the status.
 * This function is called by cellEdit, so there is probably little reason
 * to call this directly
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function commonHandler (type, temp, currentData, rowIndex, appEnv, status) {
  const { handlers } = appEnv.appControl.editControl;
  appEnv.handlers = handlers;
  let r = null;
  //let temp  = Object.assign({}, data);
  if (handlers[type] != null) {
    debugger;
    try {
      if ( appEnv.apiVersion === 2 ) { 
        r = (appEnv.table == null) 
        ? await handlers[type](temp, appEnv.appContext)
        : await handlers[type](temp, rowIndex, appEnv.appContext);
      } else {
        r = await handlers[type](temp, rowIndex, appEnv.appContext, type);
      }
    } 
    catch(err){
      console.log('Error in handler', type, err);
      status = { statusCode: 2, msg: `Error in handler ${type}. See console` };
      r = null;
    }
  }
  debugger;
  /*
  r = whatever the user returns (good or bad)
  data = the data that was passed to user and possiblly modified
  appEnv = the appEnv object
  type = the type of handler

  Now make sure the returned is compliant with the defined schema
  
  */
  // temp is now modified by user code
  // currentData is the original dat
  return isStdObject(r, temp, currentData, status, type, appEnv);
};
export default commonHandler;
