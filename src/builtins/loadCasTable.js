/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { caslRun } from '@sassoftware/restaflib';
async function loadCasTable(appEnv,lib,name) {
  
  let viyaSession = await appEnv.getViyaSession('cas');
  if (viyaSession == null) {
    return {status: {statusCode: 2, msg: 'Missing logon information'}, results: {}};
  }
  let {store, session} = viyaSession;
  try {
    //src = src;

  let src = `
  rc = checkAndLoadTable(_args_.caslib, _args_.name);
  send_response({rc=rc});
  `;

  let args = {caslib: lib, name: name};
    let r = await caslRun(store, session, src, args, true);
    let status = { statusCode: 0, msg: null };
    let results= r.results;
    return { status, results, output: r};
  } catch (err) {
    console.log(err);
    return { status: { statusCode: 2, msg: 'See console for error messages' }, results: {rc: false}, output: err};  
  }
}
export default loadCasTable;