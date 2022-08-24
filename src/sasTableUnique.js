/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description Get unique values for a specific column(sas table)
 * @async
 * @private
 * @module sasTableUnique
 * @category restafedit/core
 * @param {string} columnName    column name
 * @param {appEnv} appEnv   app Environment from setup
 * @returns {promise}       {an array of unique values }
 * @example
 *  let selectList = await casTableUnique('company, appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {columnName:[ array of unquew values] }
 */

async function sasTableUnique (columnName, appEnv, payload) {
  const data = {};
  data[columnName] = [];
  return data;
};
export default sasTableUnique;
