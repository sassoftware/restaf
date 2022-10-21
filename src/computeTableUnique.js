/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { computeRun, computeFetchData } from '@sassoftware/restaflib';
/**
 * @description Get unique values for a specific column(sas table)
 * @async
 * @private
 * @module computeTableUnique
 * @category restafedit/utility
 * @param {string} columnName    column name
 * @param {appEnv} appEnv   app Environment from setup
 * @returns {promise}       {an array of unique values }
 * @example
 *  let selectList = await computeTableUnique('company, appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {columnName:[ array of unquew values] }
 */

async function computeTableUnique (table, columnName, appEnv) {
  const { store, session } = appEnv;
  const t = `${table.libref}.${table.name}`;

  const code = `
    PROC SQL;
    CREATE TABLE WORK.QUERY
    AS
    SELECT distinct(${columnName}) as utype FROM ${t};
   QUIT;`;

  const computeSummary = await computeRun(store, session, code);
  const values = {};
  let dir = 'first';
  const res = [];
  let data;
  do {
    data = await computeFetchData(store, computeSummary, 'QUERY', dir);
    const r = data.rows.map(r1 => r1[0]);
    res.push(...r);
    dir = 'next';
  } while (data.scrollOptions.indexOf('next') >= 0);

  values[columnName] = res;
  return values;
};
export default computeTableUnique;
