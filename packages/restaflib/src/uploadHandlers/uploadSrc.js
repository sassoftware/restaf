/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import caslRun from '../caslRun';
async function uploadSrc ( store, session, modelBuf, fileInfo, save ){

	let { caslib, name } = fileInfo.output; 
    if ( name == null ) {
      throw 'Please specify table as caslib.name';
    }
	// name = name.toLowerCase(name);

  // unload and delete existing table

  // setup header for upload and the rest of the payload
    await cleanup( store, session, caslib, name );

	let JSON_Parameters = {
		casout: {
			caslib: caslib,/* a valid caslib */
			name  : name /* name of output file on cas server */
		},

		importOptions: {
			fileType: fileInfo.fileType, /* type of the file being uploaded */
		}
	};
	
	if ( fileInfo.fileExt === 'sas' || fileInfo.fileExt === 'ds2' ) {
		JSON_Parameters.importOptions.delimiter = '\\';
	}

	
	let p = {
		headers: {
			'JSON-Parameters': JSON_Parameters,
			'Content-Type'   : 'binary/octet-stream'
		},
		data  : modelBuf,
		action: 'table.upload'
	};
	let r = await store.runAction( session, p );
	if ( save === true ) {
		
		let casl = `
			action table.save r = result / 
			table = {caslib='${caslib}' name='${name}'} replace=true
			caslib='${caslib}' name='${name}';

			send_response(result);
			`;
			

		
		let r = await caslRun( store, session, casl, null, true );
	}
	const text = ( fileInfo.source == null ) ? "inline source" : fileInfo.source;
    return `Upload of ${text} to ${fileInfo.output,caslib}.${fileInfo.output.name} completed`;
}

async function cleanup( store, session, caslib, name ) {
	let table = `${caslib}.${name}`;
	let deleteSrc = `
		action table.dropTable/   
        caslib='${caslib}' name='${name}' quiet=TRUE;   
             
        action table.deleteSource status=src /   
        caslib='casuser' source= '${table}' quiet=TRUE;  
		send_response({csResults = {results= 'data deleted'}})
		`;
	let r = await caslRun( store,session, deleteSrc );

}
export default uploadSrc;