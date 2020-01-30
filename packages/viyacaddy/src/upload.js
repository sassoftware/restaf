/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let uploadModel    = require('./uploadModel');
let uploadSasTable = require('./uploadSasTable');
let uploadAstore   = require('./uploadAstore');
let uploadCasl     = require('./uploadCasl');

module.exports = async function upload (store, servers, args, vorpal){

    debugger;
    let fext    = args.options.file.split('.').pop();
    let type    = null;
    let handler = null;
    let session = null;
    
    switch(fext) {
        case 'sas':
        case 'ds2':  {
            type = 'CODE',
            handler = uploadModel;
            break;
        }
        case 'casl': {
            type = 'CODE',
            handler = uploadCasl;
            break;
        }
        
        case 'sashdat' :
        case 'sas7bdat':
        case 'csv'     : {
            type = 'DATA',
            handler = uploadSasTable;
            break;
        }
        case 'astore': {
            type = 'ASTORE';
            handler = uploadAstore;
            break;
        }
        default: {
            vorpal.log(`File type ${fext} not supported at this time.`);
            return;
        }
          
    }
    runCmd(handler, store, servers, type, args, vorpal);
    return 'running';
};

async function runCmd (handler, store, servers, type, args, vorpal){ 
   let session = null;
    try {
        let casserver = servers.itemsList(0);
        session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'));
        let r = await handler(store, session, type, args.options.file, args.options.output, vorpal);
        await session.links('delete');
        return r;
    } catch(err) {
        vorpal.log(err);
        await session.apiCall('delete');
        throw err;
    }
}
