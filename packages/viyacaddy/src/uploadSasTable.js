/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let fs = require('fs').promises;

module.exports = async function uploadSasTable (store, session, type, source, output, vorpal){

    let sourceType = null;
    let fileType = null;

   
    let [ caslib, name ] = output.split('.');
    if (name == null) {
        throw 'Please specify table as caslib.name';
    }
    name = name.toLowerCase(name);
    let fext = source.split('.').pop();
    switch(fext) {
        case 'sas7bdat': {
            fileType = 'BASESAS';
            break;
        }
        case 'sashdat': {
            fileType = 'HDAT';
            break;
        }

        case 'csv'  :{
            fileType = fext.toUpperCase();
            sourceType ='UTF8';
            break;
        }

        case 'xlsx'  :{
            fileType = fext.toUpperCase();
            break;
        }
      
        default: {
            throw `Currently file type of ${fext} is not supported`;
        }


    }


    // get rid of older version
    let casl = `
        action table.droptable /
           caslib= '${caslib}'  name= '${name}' quiet=true;

        action table.deleteSource/
           caslib= '${caslib}'  source= '${name}.sashdat' quiet=true;
        `;
    let p = {
        data  : {code: casl},
        action: 'sccasl.runcasl'
    };

    let r = await store.runAction(session, p);

    // upload the new version
    let JSON_Parameters = {
        casout: {
           caslib: `${caslib}`,
           name  : `${name}`
        },

        importOptions: {
            fileType: fileType  
        }
    };  
 
    let src = await fs.readFile(source, sourceType);
  
    p = {
        headers: { 
            'JSON-Parameters': JSON_Parameters,
            'content-type'   : 'binary/octet-stream'
        },
        data  : src,
        action: 'table.upload'
    };

  
    r = await store.runAction(session, p);


    // save the new version
    casl = `
        action table.save r = result/
            replace=true
            caslib='${caslib}' name='${name}'
            table={caslib='${caslib}' name='${name}' };
        `;

    p = {
        data  : {code: casl},
        action: 'sccasl.runcasl'
    };

    r = await store.runAction(session, p);
    // vorpal.log(JSON.stringify(r.items('disposition'), null,4));
    vorpal.log(`Upload of ${source} to ${output} completed`);
};