/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * parse a source file name
 * @module uploadSetup
 * @param {string} source - the source file( absolute or relative path can be used)
 * @returns {object} - returns {ext: file-extension, fileOptions: <option for fread>, transform: transform for content-type, contentType: content-type}
 * @alias module: uploadSetup
 * @example
 *    let t = uploadSetup('./cars.sashdat');
 */

import { uploadSrc, uploadAstore } from './uploadHandlers';

function uploadSetup (source, output) {
	let fileOptions = null; /* option for file reader */
	let contentType =
		'binary/octet-stream'; /* header content-type on API call */

	let fileType; /* fileType for use in API call */
	let handler = uploadSrc;
	let transform = noChange;

	let fext = source
		.split('.')
		.pop()
		.toLowerCase();
	switch (fext) {
		case 'sas7bdat': {
			fileType = 'basesas';
			break;
		}
		case 'sashdat': {
			fileType = 'hdat';
			break;
		}

		case 'csv': {
			fileType = fext;
			fileOptions = 'UTF8';
			break;
		}

		case 'xslx':
		case 'xsl': {
			fileType = fext;
			break;
		}

		case 'astore':
		case 'sasast': {
			fileType = fext;
			handler = uploadAstore;
			transform = toBase64;
			break;
		}

		case 'ds2':
		case 'sas': {
			fileType = 'csv';
			fileOptions = 'UTF8';
			handler = uploadSrc;
			transform = toCsv;
			break;
		}

		default: {
			throw `Currently file type of ${fext} is not supported`;
		}
	}

	let [caslib, name] = output.split('.');
	return {
		source     : source,
		output     : { caslib: caslib, name: name.toLowerCase() },
		fileType   : fileType /* for cas actions */,
		fileExt    : fext,
		fileOptions: fileOptions,
		transform  : transform,
		contentType: contentType,
		handler    : handler
	};
	function toBase64 (data) {
		return new Buffer.from(data).toString('base64');
	}
	function toCsv (data, fileInfo) {
		// preprocess to get rid of things that upset datastep
		// eslint-disable-next-line no-control-regex
		let isrc = data.replace(/[^\x00-\x7F]/g, '');
		let src = isrc.replace(/\r?\n/g, '');
		// convert to a csv
		let fileType = fileInfo.fileExt;
		let varname =
			fileType === 'sas'
				? 'dataStepSrc'
				: fileType === 'ds2'
				? 'ds2Src'
				: fileType === 'casl'
				? 'caslSrc' : 'dataStepsrc';
		let csv =
			'modelName' +
			'\\' +
			varname +
			'\n' +
			fileInfo.output.name +
			'\\' +
			' ' +
			src +
			'\n';
		return csv;
	}

	function noChange (data) {
		return data;
	}
}
export default uploadSetup;
