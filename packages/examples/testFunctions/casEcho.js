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
"use strict";

let { casSetup, caslRun} = require('@sassoftware/restaflib');

module.exports = async function casEcho (testInfo) {
	let { store, logger } = testInfo;
  let { session } = await casSetup(store, null);
  logger.info(session.items().toJS());
    
  let p = {
    action: 'builtins.echo',
    data  : {
      code: 'data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; '
    }
  };
  logger.info(p);
  /*
  let r = await store.runAction(session, p);
  console.log(JSON.stringify(session.links("execute"), null, 4));
  console.log(r.items().toJS());
  logger.info(r);
  */

  const src = `
  results = selectionLists(_args_.column,_args_.table.caslib, _args_.table.name);
  send_response({casResults = {data=results.data, statusCode=results.statusCode}});
  `
  ;
  const args = {
    table : {caslib: 'public', name: 'iris'},
    column: 'species'
  };
  
  console.log(args);
  const result = await caslRun(store, session, src, args, true);
  console.log(JSON.stringify(result, null,4));

  await store.apiCall(session.links('delete'));
  return 'done';
};
