/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
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
async function commonHandler (type, data, rowIndex, appEnv) {
  const { handlers } = appEnv.appControl.editControl;
  if (handlers[type] == null) {
    return [data, { statusCode: 0, msg: null }];
  } else {
    const [newDataRow, status] = await handlers[type](data, rowIndex, appEnv, type);
    return [newDataRow, status];
  }
};
export default commonHandler;
