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
let payload = require('./config')();
let store   = restaf.initStore();
let {print} = require('@sassoftware/restaflib');

/* --------------------------------------------------------------------------------
 * Logon to the restaf server and setup file service
 * ---------------------------------------------------------------------------------
 */

async function setup (payload, ...args) {
  let msg = await store.logon(payload);
 
  debugger;
  let { modelRepository } = await store.addServices(...args);

  print.links(modelRepository, 'Root Links for modeRepository');

  payload = {
    qs: {
      limit: 1000
    }
  };

  let repos = await store.apiCall(modelRepository.links("repositories"), payload);
  print.itemsList(repos, 'List of reposs');

  let n = repos.itemsList(1);
  let folder = await store.apiCall(repos.itemsCmd(n, 'folder'));
  print.links(folder, 'folder links');
  let members = await store.apiCall(folder.links('members'));
  print.itemsList(members, 'members');

  print.object(members.itemsCmd(members.itemsList(0)), 'member cmds');
  let resource = await store.apiCall(members.itemsCmd(members.itemsList(0,'getResource')));
  print.items(resource, 'resource links');


  // get the content information on the first model 

  // print.msg(models.itemsList(1));
  /*
  let contentLink = models.itemsCmd(models.itemsList(0), 'contents');
  let c1 = await store.apiCall(contentLink);

  print.itemsList(c1, `List of items in the content for model ${models.itemsList(0)}`);

  // Now print the content link for the first item 

  let itemName = c1.itemsList(2);
  print.object(c1.itemsCmd(itemName, 'content'), `links for ${itemName}`);
  
  // now try to get the content
  let actualcontent = await store.apiCall(c1.itemsCmd(itemName, 'content'));
  
  print.object(actualcontent.items(), 'final content');
  
  print.itemsList(actualcontent);
  */


  return true;
}

setup(payload, "modelRepository")
  .then(r => console.log(r))
  .catch(e => console.log(JSON.stringify(e, null, 4)));
