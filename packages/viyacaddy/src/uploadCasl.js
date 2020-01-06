/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const fs = require('fs').promises;
//
// For demonstration purposes using separate api calls for each action
//

module.exports = async function uploadCasl (store,session, type, source, output, vorpal){

    let [ caslib,name ] = output.split('.');

    if (name == null) {
      throw 'Please specify table as caslib.name';
    } else {
      throw 'Not Ready for Prime time - still under development';
    }
    /*
    let fext = source.split('.').pop();
    if (fext !== 'casl') {
      throw 'File has to have an casl file extension';
    }

    let data = await fs.readFile(source, 'UTF8');
    // eslint-disable-next-line no-control-regex
    data = data.replace(/[^\x00-\x7F]/g,"");
    data =  data.replace(/\r?\n/g, '');
  
    let casl = `
      srcCode = dquote("${data}");
      caslib = '${caslib}';
      name   = '${name}';
  
      action table.droptable /
       caslib= caslib  name= name quiet=true;

      action table.deleteSource/
      caslib= name  source= '${name}.sashdat' quiet=true; 

      rc = upload_codestore( {caslib= caslib name=name}, srcCode);
      action table.save r = result / 
         caslib=caslib name=name replace=true
         table={caslib=casuser name=name};
   

      let payload = {
        action: 'sccasl.runcasl',
        data  : { code: casl}
      };
      await store.runAction(session, payload);


    // vorpal.log(JSON.stringify(r.items('disposition'), null,4));
    vorpal.log(`Upload of ${source} to ${output} completed`);
    */
  };
  

