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

let { casSetup} = require('@sassoftware/restaflib');

module.exports = async function casEcho (testInfo) {
	let { store, logger } = testInfo;
  let { session } = await casSetup(store, null);
  logger.info(session.items().toJS());
    
  store.setAppData('casSession' , session);

  let t = store.getAppData();
  console.log(t);

  
  await store.apiCall(session.links('delete'));
  return 'done';
};
