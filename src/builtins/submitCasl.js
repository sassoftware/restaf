/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { caslRun } from '@sassoftware/restaflib';
async function submitCasl(appEnv,src, args, useCommons) {

  let viyaSession = await appEnv.getViyaSession('cas');
  if (viyaSession == null) {
    return {status: {statusCode: 2, msg: 'Missing logon information'}, results: {}};
  }

const { store, session } = viyaSession;
  
  try {
    //src = src;
    let nf  = `
    function checkAndLoadTable2(caslib, name);
   action table.tableExists result=r status=s/    
            caslib = caslib   
            name  = name;
 
   if (r.exists ne 1) then do;
    table.loadtable result=r status=s/
            caslib=caslib casout={caslib= caslib name=name replace=TRUE}
            path=name||'.sashdat';
    end;
    action table.tableExists result=r status=s/    
            caslib = caslib    
            name  = name; 
   rc= false;
   if (r.exists > 0 ) then do;
     rc = true;
  end;
   return rc;
end;`;
src = src + nf;

   
    let r = await caslRun(store, session, src, (args == null ? {} : args), 
    (useCommons == false ?  false : useCommons));

    let status = { statusCode: 0, msg: null };
    let results;
    if (r.results.casResults == null) {
      results = r.results;
    } else {
      results = r.results.casResults;
    }
    return { status, results, output: r};
    
  } catch (err) {
    console.log(err);
    return { status: { statusCode: 2, msg: 'See console for error messages' }, results: {}, output: err};  
  }
}
export default submitCasl;