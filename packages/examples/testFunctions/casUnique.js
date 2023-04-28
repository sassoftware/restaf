/*
  ------------------------------------------------------------------------------------
	Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved	Licensed under the Apache License, Version 2.0 (the 'License');
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
 *
	http://www.apache.org/licenses/LICENSE-2.0
 *
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an 'AS IS' BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
  ---------------------------------------------------------------------------------------
 *
 */

/*
  Run a cas data step and then retrieve the created table
 */
  'use strict';

  let { casSetup, caslRun} = require('@sassoftware/restaflib');
  
  module.exports = async function casUnique(testInfo) {
		  let {store, logger} = testInfo;
		  let { session } = await casSetup(store);
	
      const src = `
      results = selectionLists(_args_.column ,_args_.table.caslib, _args_.table.name, _args_.where);
      send_response({casResults = {data=results}});
      `
		  let payload = {
        column: ['make'],
			  where: `origin eq 'USA' and type eq 'Truck'`,
			  table: { caslib: 'casuser', name: 'cars' },
			  
		  };
		  
      let r = await caslRun(store,session, src, payload, true);
      console.log(r.results.casResults.data);
		  return 'done';
	  }
  