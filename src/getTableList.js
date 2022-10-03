/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import computeTableList from './computeTableList';
import casTableList from './casTableList';

/**
 * @description get the list of tables in a specific library
 * @async
 * @module getTableList
 * @category restafedit/core
 * @param {string} lib  - caslib or libref (must match source)
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - returns an array of table names
 * @example
 *
 */

async function getTableList (lib, appEnv) {
  debugger;
  const handler = (appEnv.source === 'cas') ? casTableList : computeTableList;
  const r = await handler(lib, appEnv);
  debugger;
  return r;
}

export default getTableList;
