/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import {computeResults, computeFetchData, computeRun} from '@sassoftware/restaflib';
/**
 * @description Run code in compute server
 * @private
 * @param {string} src 
 * @param {object} macros - will be prepended to src
 * @param {object} output  - {log: false, ods: true, tables: ['table1', 'table2]
 * @param {*} appEnv 
 * @returns {promise} - {status: {statusCode: 0, msg: null}, results: results}
 * @example
 *   The output results will be in the results object as follows(based on the output parameter)
 *  {
 *   log: 'log output',
 *   ods: 'ods output',
 *   tableList: [array of table names from the run],
 *   tables: {
 *    table1: [array of rows],
 *    table2: [array of rows]
 *   }
 *  }
 *  let src = `ods html open;proc print data=&table; run;ods html close;`;
 *  let macros = {table: 'sashelp.class'};
 *  let outputResults = await appEnv.builtins.submit(src, macros, {ods: true}, appEnv);
 *  data.ods = outputResults.results.ods;
 *  return [data, outputResults.status];
 * 
 */
async function submit(appEnv, src, macros, output) {
  
  let viyaSession = appEnv.getViyaSession('compute');
  if (viyaSession == null) {
    return {status: {statusCode: 2, msg: 'Missing logon information'}, results: {}};
  }
  let {store, session} = viyaSession;
  
  try {
    let computeSummary = await computeRun(
      store,
      session,
      src,
      macros
    );
    let jobStatus = computeSummary.SASJobStatus;
    
    let result = {};
    if (jobStatus === 'failed' || jobStatus === 'error' || jobStatus === 'running') {
      let msg = `Job  ended with status of ${jobStatus}. Please check the log for errors.`; 
      result.log = await computeResults(appEnv.store, computeSummary, 'log');
      return {status:{statusCode: 2, msg: msg}, results: result};
    }
   
    if (output.log === true) {
      let log = await computeResults(appEnv.store, computeSummary, 'log');
      let logText = '';
      // eslint-disable-next-line array-callback-return
      log.map((data) => {
        let line = data.line.replace( /(\r\n|\n|\r)/gm, "" );
        if ( line.length === 0 ) {
           logText = logText + '\n';
        } else {}
		    logText = logText + line + '\n';
      });
      result.log = logText;
    }
    
    if (output.ods === true) {
      result.ods = await computeResults(appEnv.store, computeSummary, 'ods');
      let odsUrl = computeSummary.ods.get('link').get('uri');
      let connection = appEnv.store.connection();
      let host = (connection.options.proxyServer == null) ? appEnv.logonPayload.host : connection.options.proxyServer;
      result.odsurl = `${host}${odsUrl}`;
    }
    
    result.tables = {};
    result.tableList = [];
    let tableList = await computeResults(appEnv.store, computeSummary, 'tables');
    result.tableList = tableList;
    if (output.tables != null) {
      for (let i in output.tables) {
        let t = output.tables[i];
        let tname = t.table.toUppercase();
        if (tableList.includes(tname) === true) {
          let r = await computeFetchData(appEnv.store, computeSummary, tname, 'first',
            t.payload, 'rows');
          result[tname] = r.data;
        }
      }
    }
   // result.computeSummary = computeSummary;
    return { status:{statusCode: 0, msg: "completed"}, results:  result };
  }
  catch (err) {
    console.log(err);
    return { status: {statusCode: 2, msg: err} , results: {} };
  }

}
export default submit;