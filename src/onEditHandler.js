/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
//import handlerResult from './handlerResult';
import isStdObject from './isStdObject';
/**
 * @description Run init, main or term handlers
 * @async
 * @private
 * @module onEditHandler
 * @category restafedit/core
 * @param {string} type   - type of exit (column name)
 * @param {rowObject} data        - rowObject
 * @param {number} rowIndex    - client-side Row Index
 * @param {appEnv} appEnv      - app Environment from setup
 * @param {object} status      - status object
 * @returns {promise}     - [data, status]
 * @example
 * The function returns the updated data and the status.
 * This function is called by cellEdit, so there is probably little reason
 * to call this directly
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function onEditHandler (type, data, rowIndex, appEnv, status) {
  const { handlers } = appEnv.appControl.editControl;
  appEnv.handlers = handlers;
  let r = null;
  debugger;
  if (handlers[type] != null) {
    try {
       r = await handlers[type](data,type,  rowIndex, appEnv);
    } catch (err) {
      console.log('Error in handler', type, err);
      status = { statusCode: 2, msg: `Error in handler ${type}. See console` };
      return [data, status];
    }
  }
  return isStdObject(r, data, status);
};
export default onEditHandler;
