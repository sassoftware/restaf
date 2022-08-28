/* eslint-disable no-tabs */
/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { casUpload, caslRun } from '@sassoftware/restaflib';

/**
 * @description Get unique values for a specific column
 * @async
 * @module uploadData
 * @category restafedit/core
 * @param {object} output table
 * @param {array}  data
 * @param {array}  drop fields to delete
 * @param {object} addon columns
 * @param {appEnv} appEnv   - app Environment from setup
 * @returns {promise}       - {an array of unique values }
 * @example
 *  let selectList = await distinctValues('company', appEnv))
 *  This is useful to get a list of unique values for selected columns.
 *  {company:['IBM', 'Microsoft', 'SAS'] }
 */

async function uploadData (table, data, drop, addon, appEnv, append2Table) {
  const { store, session } = appEnv;
  debugger;
  let t = data[0];
  for (let j = 0; j < drop.length; j++) {
    delete t[drop[j]];
  }
  t = { ...addon, ...t };
  const columns = Object.keys(t);

  let csvArray = columns.join(',') + '\n';
  debugger;
  for (let i = 0; i < data.length; i++) {
    let temp = data[i];
    temp = { ...temp, ...addon };
    const valArray = [];
    columns.forEach((c, l) => {
      let v = temp[c];
      if (typeof v === 'string') {
        v = v.trim();
      }
      valArray[l] = v;
    });
    csvArray = csvArray + valArray.join(',') + '\n';
  }
  debugger;
  console.log(csvArray);
  console.log(casUpload);
  console.log(_casTableUpload);
  let result;
  if (appEnv.source === 'cas') {
    result = await _casTableUpload(
      store,
      session,
      table,
      csvArray,
      append2Table
    );
  } else {
    result = {};
  }
  debugger;
  console.log(result.items().toJS());
  return result;
}

async function _casTableUpload (store, session, table, csvArray, append2Table) {
  debugger;
  console.log('calling casUpload');
  const t = `${table.caslib}.${table.name}`;
  let r = await casUpload(store, session, null, t, true, csvArray);
  console.log('end of casUpload');
  debugger;
  if (append2Table != null) {
    debugger;
    const args = {
      masterTable: append2Table,
      setTable   : table
    };
    const src = `
			rc = checkAndLoadTable(_args_.masterTable.caslib, _args_.masterTable.name);
			if (rc ne true) then do;
				results = {Errors= 'Unable to access ' ||_args_.masterTable.caslib||'.'||_args_.masterTable.name};   
				send_response(casResults=results);
				end; 
			rc = checkAndLoadTable(_args_.setTable.caslib, _args_.setTable.name);
			if (rc ne true) then do;
				results = {Errors= 'Unable to access ' ||_args_.setTable.caslib||'.'||_args_.setTable.name};   
				send_response(casResults=results);
				end;
			action datastep.runCode r=result rc=rc/ code='data ${append2Table.caslib}.${append2Table.name} (append=YES);set ${t};run;'
			send_response({casResults = {code = rc}});
			`;
    console.log(src);
    r = await caslRun(store, session, src, args, true);
    console.log(r);
    return r;
  }
}
export default uploadData;
