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
async function commonHandler(type, temp, currentData, rowIndex, appEnv, status, value) {
  const { handlers } = appEnv.appControl.editControl;
  let r = null;
  appEnv.appContext.handlers = handlers;
  let userFuncf = handlers[type];
  if (userFuncf != null) {
    try {
      if (appEnv.apiVersion === 2) {
        if (appEnv.table == null) {
          r = (type === 'appValue')
            ? await userFuncf(value, temp, appEnv.appContext)
            : await userFuncf(temp, appEnv.appContext);
        } else {
          r = await userFuncf(temp, rowIndex, appEnv.appContext);
        }
      } else {

        // for backward compatibility
        r = await userFuncf(temp, rowIndex, appEnv.appContext);
      }
    }
    catch (err) {
      console.log('Error in handler', type, err);
      status = { statusCode: 2, msg: `Error in handler ${type}. See console` };
      return [currentData, status];
    }
  }
  ;
  /*
  user MUST modify temp to reflect the changes and not a copy of temp
  Now make sure the returned is compliant with the defined schema
  
  */
  // temp is now modified by user code
  // currentData is the original dat
  let result = isStdObject(r, temp, currentData, status, type, appEnv);
  return result;
};


export default commonHandler;
