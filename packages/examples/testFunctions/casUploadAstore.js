/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the 'License');
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an 'AS IS' BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

'use strict';

let restaf     = require('@sassoftware/restaf');
let fs         = require('fs');
let path       = require('path');
let {casSetup} = require('@sassoftware/restaflib');

let payload = require('./config')();
let datadir = './data/astore';
let worklib = 'casuser';

let store = restaf.initStore();

//TBD: run uploads in parallel using store.submit
async function uploadFiles (store, session, caslib, datadir) {
  let files = readdir(datadir);
  let executeCmd = session.links('execute');

  for (let i = 0; i < files.length; i++) {
    let parms = { caslib: caslib, name: files[i], quiet: true };
    await store.runAction(session, { action: 'table.dropTable', data: parms });

    parms = { caslib: caslib, source: files[i], quiet: true };
    await store.runAction(session, {
      action: 'table.deleteSource',
      data  : parms
    });

    parms = {
      rstore: { name: files[i], caslib: caslib, replace: true },
      store : readFile(files[i], datadir)
    };
    payload = { action: 'aStore.upload', data: parms };
    console.log(`uploading  ${files[i]}`);
    await store.runAction(session, payload);

    parms = { rstore: { name: files[i], caslib: caslib } };
    payload = { action: 'aStore.describe', data: parms };
    await store.runAction(session, payload);

    parms = {
      caslib : caslib,
      name   : files[i],
      replace: true,
      table  : {
        caslib: caslib,
        name  : files[i]
      }
    };
    payload = { action: 'table.save', data: parms };
    await store.runAction(session, payload);
  }
}

function readFile (filename, datadir) {
  let filespath = path.join(datadir, filename);
  let data = fs.readFileSync(filespath);
  return new Buffer(data).toString('base64');
}

function readdir (dir) {
  let fulldir = path.resolve(dir);
  let files = fs.readdirSync(fulldir);
  return files;
}

casSetup(store, payload, 'raf')
  .then(r => uploadFiles(store, r.session, worklib, datadir))
  .then(r => console.log('All done'))
  .catch(err => console.log(err));
