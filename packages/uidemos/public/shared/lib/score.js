/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

/*
 * Simple echo action example
 */
'use strict';

 async function score(store, session, inParms) {

    let {rstore, input} = inParms;
    if ( input === null ) {
        throw {Error: 'Missing input' }
    }
    // create data step assignment statements
    let setvar ='';    
    for ( let v in input ) {
        let d = input[v];
        d = (typeof d === 'string') ? `"${d}"` : d;
        setvar = setvar + `${v}=${d};`;
    }
  
    // create casl statements
    let caslStatements = `
        loadactionset "astore";

        action dataStep.runCode /
          single="YES" code = 'data casuser.INPUTDATA;${setvar}run;';

        action table.loadTable /
           caslib = "${rstore.caslib}" 
           path   = "${rstore.name}.sashdat"
           casout  = { caslib = "${rstore.caslib}"   name = "${rstore.name}" replace=TRUE};
   
        action astore.score /
          table  = { caslib= 'casuser' name = 'INPUTDATA' } 
          rstore = { caslib= "${rstore.caslib}" name = '${rstore.name}' }
          out    = { caslib = 'casuser' name = 'OUTPUTDATA' replace= TRUE};

        action table.fetch r = result/
            format = TRUE
            table = { caslib = 'casuser' name = 'OUTPUTDATA' } ;

        send_response(result);

        `;

    // Run cas actions
    let  payload = {
        action: 'sccasl.runcasl',
        data  : { code: caslStatements}
    }
    let result = await store.runAction(session, payload);

    // convert result table into a js object
    let score = scoreAsJson(result, 'Fetch');
    return score[0];
   
}
