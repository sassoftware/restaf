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
 * @category restafedit/utility
 * @param {string} lib  - caslib or libref (must match source)
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - returns an array of table names(cas or SAS)
 * @example
 *
 */

async function getTableList (lib, appEnv) {
  const handler = (appEnv.source === 'cas') ? casTableList : computeTableList;
  const r = await handler(lib, appEnv);
  return r;
}

export default getTableList;
