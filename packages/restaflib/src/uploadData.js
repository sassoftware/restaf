/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

let FormData = require('form-data');
async function uploadData (caslib, fileName, file, type, store,scope) {
    //Making this self contained 
  
    let {casManagement} = await store.addServices('casManagement');
    let servers = await store.apiCall(casManagement.links('servers'));
	if (servers.itemsList().size === 0) {
		// eslint-disable-next-line no-throw-literal
		throw { Error: 'No cas servers were found' };
	} 
    let serverName = servers.itemsList(0);
    
    // query for preferred caslib 
    let p1 = {
        qs: {
            filter: `eq(name,${caslib})`
        }
    };
    let caslibResult = await store.apiCall(servers.itemsCmd(serverName, 'caslibs'), p1);
    //get table end point
    let tables = await store.apiCall(caslibResult.itemsCmd(caslib,'tables'));

    let qt = {
        qs: {
            filter: `eq(name, ${fileName.trim().toUpperCase()})`
        }
    };

    let lastTable = await store.apiCall(caslibResult.itemsCmd(caslib,'tables'), qt);
   
    if (lastTable.itemsList().size === 1) {
        let n = lastTable.itemsList(0);
        let uri = lastTable.items(n,'data','tableReference', 'tableUri');
        return uri;
    }

    // upload table using the upload rel
    
    let formData = new FormData();
    formData.append('tableName', fileName);
    formData.append('format', type);
    formData.append('scope', (scope == null) ? 'global' : scope);
    formData.append('replace', true);
    formData.append('containsHeaderRow', true);
    formData.append('file', file);  // note that we are passing the File object
    
    let p3 = {
        data   : formData,
        headers: {
            'content-type': `multipart/form-data; boundary="----------12345678901234567"`
        }
    }
    debugger;
    let upload = await store.apiCall(tables.links('upload'), p3);
    debugger;
    // get the table uri for use with other apis
    // let uri = upload.items('tableReference', 'tableUri');

    return upload;

}

export default uploadData;
