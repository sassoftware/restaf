/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let fs = require('fs').promises;

module.exports = async function uploadModel (store, session, type, source, output, vorpal){

    let [ caslib, name ] = output.split('.');
    if (name == null) {
      throw 'Please specify table as caslib.name';
    }
   
    name = name.toUpperCase(name);

    let fext = source.split('.').pop();
    let varname = (fext ==='sas')   ? 'dataStepSrc' 
                : (fext === 'ds2')  ? 'ds2Src'
                : (fext === 'casl') ? 'caslSrc'
                : 'dataStepsrc';

    let isrc = await fs.readFile(source, 'UTF8');
    // preprocess to get rid of things that upset datastep
    // eslint-disable-next-line no-control-regex
    isrc = isrc.replace(/[^\x00-\x7F]/g,"");
    let src =  isrc.replace(/\r?\n/g, '');

    let casl = `
        _args_ = {modelName = '${name}', ${varname}="${src}" };
        caslib = '${caslib}';
        name   = '${name}';

        result = argsToTable(_args_, caslib, name);

        print result;
    
        function argsToTable(_arg_, caslib, name );  
            action table.droptable/ 
                caslib=caslib name=name quiet=TRUE; 
            action table.deleteSource/
                 caslib=caslib  source=name quiet=true;   
    
            i = 1; 
            print 'data deleted';

            do key,obj over _arg_; 
                columns[i] = key; 
                row[i] = obj; 
                if ( isString(obj) ) then 
                    type[i] = 'varchar';  
                else if ( isInteger(obj) ) then  
                    type[i] = 'int';  
                else type[i] = 'double'; 
                i = i + 1; 
                end;   
            data1 = newTable('data1', columns, type, row );  
            casuser ='casuser';
            saveresult data1 casout=name caslib=casuser replace; 
            print 'result saved';
        
            action table.save r = result / 
               caslib=caslib name=name replace=true

               table={caslib=casuser name=name};
               
            return result;
            end;  
        `;
      

    let payload = {
        action: 'sccasl.runcasl',
        data  : {code: casl}
    };

  
    let r = await store.runAction(session, payload);
    // vorpal.log(JSON.stringify(r.items('disposition'), null,4));
    vorpal.log(`Upload of ${source} to ${output} completed`);
};
    

