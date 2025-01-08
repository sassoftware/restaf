/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import cellEdit from './cellEdit';

/**
 * @description Run init, main or term handlers
 * @async
 * @module controlHandler
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
 * Need this indirection to allow users to users to init, main and term as column names
 */
async function controlProgram (type, data, rowIndex, appEnv) {
  return await cellEdit('_'+ type, null, rowIndex, data, appEnv);
};
export default controlProgram;
