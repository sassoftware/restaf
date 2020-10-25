/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


let addServices   = require('./addServices');
let casSession    = require('./casSession');
let casEcho       = require('./casEcho');
let casDSandFetch = require('./casDSandFetch');
let casTables     = require('./casTables');
let casUploadCsv = require('./casUploadCsv');
let casUploadProgram = require('./casUploadProgram');
let casUploadProgram2 = require('./casUploadProgram2');
let casUploadCsv2 = require('./casUploadCsv2');
let casUploadbdat = require('./casUploadbdat');
let casUploadhdat = require('./casUploadhdat');
let casUploadAst = require('./casUploadAst');
let computeDS = require('./computeDS');
let filesCreate = require('./filesCreate');
let filesPaginate = require('./filesPaginate');
let casScoreHdat = require('./casScoreHdat');
let casScoreAst = require('./casScoreAst');
let casScoreAstFail = require('./casScoreAstFail');
let foldersPaginate = require('./foldersPaginate');
let logonTest = require('./logonTest');
let modelRepoRoot = require('./modelRepoRoot');
let modelDestinationCas = require('./modelDestinationCas');
let masScore = require('./masScore');
let identities = require('./identities');



module.exports = {
	addServices,
	casSession,
	casEcho,
	casDSandFetch,
	casTables,
	casUploadCsv,
	casUploadProgram,
	casUploadProgram2,
	casUploadCsv2,
	casUploadbdat,
	casUploadhdat,
	casUploadAst,

	computeDS,
	filesCreate,
	filesPaginate,
	foldersPaginate,
	casScoreHdat,
	casScoreAst,
	casScoreAstFail,
	masScore,
	logonTest,
	modelRepoRoot,
	modelDestinationCas,

	identities
};