/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

//
// Notes: Retrieve a SAS table and convert to a json
// convert table to object of the form [{var1: value, var2: value,...},....]
// ex: [{merlot:10, twobit:20}, {merlot: 20, twobit:30}]

;
/**
 * @description return content of a file output from a compute run
 * @async
 * @module computeFileContent
 * @category restaflib/compute
 *
 * @param {object} store - restaf store
 * @param {object} computeSummary - computeSummary
 * @param {string} fileref - name of the fileref
 * @param {boolean} url - set to true if you want the url and not the content
 *
 * @returns {promise} - get uri for content]
 */
async function computeFileContent ( store, computeSummary, fileref, url ) {
	
	let fileInfo = computeSummary.files[fileref];
	if ( fileInfo == null ) {
		throw `Invalid fileref ${fileref}`;
	}
	if ( fileInfo.current === null ) {
		let payload = {
			qs: {
				filter: `eq(name,'${fileref}')`
			}
		};
		let result = await store.apiCall(
			computeSummary.session.links( 'files' ),
			payload
		);
		result = await store.apiCall( result.itemsCmd( fileref, 'self' ) );
		fileInfo.current = result;
	}
	let r;
	if ( url === true ) {
		r = `${computeSummary.session.host}${fileInfo.current.links( 'content', 'link', 'uri' )}`;
		return r;
	} else {
		if ( fileInfo.data === null ) {
			let rx = await store.apiCall( fileInfo.current.links( 'content' ) );
			let r = rx.items();
			fileInfo.data = r;
			return r;
		} else {
			return fileInfo.data;
		}
	}

}
export default computeFileContent;
