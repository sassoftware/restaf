/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let fs = require('fs').promises;
let restaflib = require('@sassoftware/restaflib');

module.exports = async function uploadCasl (store, session, type, source, output, vorpal){

    let [ caslib, name ] = output.split('.');
    if (name != null) {
      throw 'Creating codestore is not ready for primetime.';
    }
   
    name = name.toLowerCase(name);

    let isrc = await fs.readFile(source, 'UTF8');
    // preprocess to get rid of things that upset datastep
    // eslint-disable-next-line no-control-regex
    isrc = isrc.replace(/[^\x00-\x7F]/g,"");
    let src =  isrc.replace(/\r?\n/g, '');
    // Now translate quotes to some non-SAS standard char
    src = src.replace(/'/g, '^');
    src = src.replace(/"/g, '#');


    // Code below is simply a place holder
    // Does not really work yet - upload_codestore(experimental) seems to fail
    //
    let casl = `
      caslib = '${caslib}';
      name   = '${name}';

      action table.droptable /
       caslib= caslib  name= name quiet=true;

      action table.deleteSource/
      caslib= caslib  source= '${name}.sashdat' quiet=true; 

      /* recover quotes */
      temp = tranwrd('${src}', '^', ""'"");
      temp = tranwrd(temp, '#', '""');
    
      action table.save r = result / 
          table = {caslib=caslib name=name} replace=true
          caslib=caslib name=name;
      send_response(result);
        `;
      

    let r = await restaflib.caslRun(store, session, casl, null);
    vorpal.log(`Upload of ${source} to ${output} completed`);
};
    

