/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

import caslRun from '../caslRun';
async function uploadSrc (store, session, modelBuf, fileInfo, save){

	let { caslib, name } = fileInfo.output; 
    if (name == null) {
      throw 'Please specify table as caslib.name';
    }
	// name = name.toLowerCase(name);
    
  // setup header for upload and the rest of the payload
	let JSON_Parameters = {
		casout: {
			caslib: caslib,/* a valid caslib */
			name  : name /* name of output file on cas server */
		},

		importOptions: {
			fileType: fileInfo.fileType, /* type of the file being uploaded */
		}
	};
	
	if (fileInfo.fileExt === 'sas' || fileInfo.fileExt === 'ds2') {
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
	
	await store.runAction(session, p);
	
	if (save === true) {
		let casl = `
			action table.save r = result / 
			table = {caslib='${caslib}' name='${name}'} replace=true
			caslib='${caslib}' name='${name}';

			send_response(result);
			`;
		let r = await caslRun(store, session, casl, null);
	}

    return `Upload of ${fileInfo.source} to ${fileInfo.output,caslib}.${fileInfo.output.name} completed`;
}

export default uploadSrc;