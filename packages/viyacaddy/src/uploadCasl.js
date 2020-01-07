/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const fs = require('fs').promises;
let restaflib = require('@sassoftware/restaflib');

module.exports = async function uploadCasl (store,session, type, source, output, vorpal){

    let [ caslib,name ] = output.split('.');

    if (name != null) {
      throw 'Uploading casl to codestore is not ready for prime time. Coming soon';
    } 

    let data = await fs.readFile(source, 'UTF8');
    // eslint-disable-next-line no-control-regex
    data = data.replace(/[^\x00-\x7F]/g,"");
    data =  data.replace(/\r?\n/g, '');
    data =  data.replace(/'/g, '"');
  
    let casl = `
      _args_ = {modelName = '${name}', caslsrc='${data}' };
      caslib = '${caslib}';
      name   = '${name}';
  
      function getValue(_arg_);  
        do key,obj over _arg_;  
            src = obj; 
            end;  
        return src;
        end;  
      
      
      action table.droptable /
       caslib= caslib  name= name quiet=true;

      action table.deleteSource/
      caslib= caslib  source= '${name}.sashdat' quiet=true; 

      action datastep.runCode /
       code = 'data public.commonfunc; x=10;run; ';

      srcCode = getValue(_args_);
      rc = upload_codestore( {caslib= caslib name=name}, srcCode);
      action table.save r = result / 
         caslib=caslib name=name replace=true
         table={caslib=caslib name=name};
   
      send_response(result);
      `
      ;
      
      let r = await restaflib.caslRun(store, session, casl, null);


    // vorpal.log(JSON.stringify(r.items('disposition'), null,4));
    vorpal.log(`Upload of ${source} to ${output} completed`);
    
  };
  

