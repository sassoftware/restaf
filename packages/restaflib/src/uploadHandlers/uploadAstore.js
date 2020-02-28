/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

async function uploadAstore(store, session, astoreBuf, fileInfo) {
	let { caslib, name } = fileInfo.output; 
	if (name == null) {
		throw 'Please specify table as caslib.name';
	}
	name = name.toLowerCase(name);

	// delete old table
	let casl = `
      action table.droptable /
       caslib= '${caslib}'  name= '${name}' quiet=true;

      action table.deleteSource/
      caslib= '${caslib}'  source= '${name}.sashdat' quiet=true;   
      `;

	let payload = {
		action: 'sccasl.runcasl',
		data  : { code: casl }
	};
	await store.runAction(session, payload);

	// upload table

	payload = {
		action: 'astore.upload',
		data: {
			rstore: { name: `${name}`, caslib: `${caslib}`, replace: true },
			store : astoreBuf
		}
	};

	let r = await store.runAction(session, payload);

	return `Upload of ${fileInfo.source} to ${caslib}.${name} completed`;
}

export default uploadAstore;
