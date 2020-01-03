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

"use strict";

let restaf  = require('@sassoftware/restaf');
let {print} = require('@sassoftware/restaflib');

let payload = require('./config')();

// Keys to the kingdom
// Create the restaf

let store = restaf.initStore();


async function example (store, logonPayload, counter) {
  await store.logon(logonPayload);
  let { reports, folders} = await store.addServices("reports", "folders");

  /*
  let reportsList = await store.apiCall(reports.links("reports"));
  print.itemsList(reportsList, 'List of reports');
  let next;
  // do this loop while the service returns the next link or counter is 0
  while ((next = reportsList.scrollCmds("next")) !== null && --counter > 0) {
    reportsList = await store.apiCall(next);
    print.itemsList(reportsList, 'List of reports');
  }
  */

  let foldersList = await store.apiCall(folders.links("folders"));
  print.itemsList(foldersList, 'List of folders');

  // do this loop while the service returns the next link or counter is 0
  let next;
  while ((next = foldersList.scrollCmds("next")) !== null && --counter > 0) {
    foldersList = await store.apiCall(next);
    print.itemsList(foldersList, '...List of folders');
  }

  // get the folder named "Samples" and get its folderURI.

  let payload = {
    qs: {
        filter: `eq(name,'Samples')`
    }
  };
  let samplesFolder = await store.apiCall(folders.links("folders"), payload);
  print.object(samplesFolder.items('Samples', 'data'), 'data');
  


  // now we need to the rest...
  
  return "All Done";
}


example(store, payload, 10)
  .then(status => console.log(status))
  .catch(err => console.log(err));
