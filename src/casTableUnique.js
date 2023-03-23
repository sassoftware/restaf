/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { caslRun } from '@sassoftware/restaflib';

/**
 * @description Get unique values for a specific column
 * @async
 * @private
 * @module casTableUnique
 * @category restafedit/utility
 * @param {object} table object
 * @param {string} columnName    column name
 * @param {appEnv} appEnv   app Environment from setup
 * @returns {promise}       {an array of unique values }
 * @example
 *  let selectList = await casTableUnique('company, appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {columnName:[ array of unque values] }
 */

async function casTableUnique (table, columnName, appEnv) {
  const { store, session } = appEnv;

  const src = `
  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);
  send_response({casResults = {data=results}});
  `
  ;
  const args = {
    table,
    column: columnName
  };

  const result = await caslRun(store, session, src, args, true);
  if (result.results.casResults.data.statusCode !== 0) {
    // eslint-disable-next-line no-throw-literal
    throw 'Failed to create unique list';
  }

  const data = result.results.casResults.data.data;

  return data;
};
export default casTableUnique;
