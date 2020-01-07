/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const fs = require('fs').promises;
//
// For demonstration purposes using separate api calls for each action
//

module.exports = async function uploadAstore (store,session, type, source, output, vorpal){

    let [ caslib,name ] = output.split('.');
    if (name == null) {
      throw 'Please specify table as caslib.name';
    }
    name = name.toLowerCase(name);

    let data = await fs.readFile(source);
    let astoreBuf = new Buffer.from(data).toString("base64");

    // delete old table
    let casl = `
      action table.droptable /
       caslib= '${caslib}'  name= '${name}' quiet=true;

      action table.deleteSource/
      caslib= '${caslib}'  source= '${name}.sashdat' quiet=true;   
      `;

      let payload = {
        action: 'sccasl.runcasl',
        data  : { code: casl}
      };
      await store.runAction(session, payload);

    // upload table
    
    payload = {
      action: 'astore.upload',
      data  : {
        rstore: { name: `${name}`, caslib: `${caslib}`, replace: true },
        store : astoreBuf
      }
    };

    // save

    let r = await store.runAction(session, payload);

    payload = {
      action: 'table.save',
      data  : {
         name   : `${name}`, caslib : `${caslib}`, replace: true,
         table  : { name: `${name}`, caslib: `${caslib}`}
      }
    };

    r = await store.runAction(session, payload);
    // vorpal.log(JSON.stringify(r.items('disposition'), null,4));
    vorpal.log(`Upload of ${source} to ${output} completed`);
  };

