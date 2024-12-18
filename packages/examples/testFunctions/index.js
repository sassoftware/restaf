/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


let addServices   = require( './addServices' );
let casSession    = require( './casSession' );
let casSessionAttach = require( './casSessionAttach' );
let casEcho       = require( './casEcho' );
let casDSandFetch = require( './casDSandFetch' );
let casDSandFetch2 = require( './casDSandFetch2' );
let casDSandFetch2v2 = require( './casDSandFetch2v2' );
let casTables     = require( './casTables' );
let casUploadCsv = require( './casUploadCsv' );
let casUploadProgram = require( './casUploadProgram' );
let casUploadProgram2 = require( './casUploadProgram2' );
let casFetchData3 = require( './casFetchData3' );
let casUploadCsv2 = require( './casUploadCsv2' );
let casUploadCsv3 = require( './casUploadCsv3' );
let casAppendTable1 = require( './casAppendTable1' );
let casUploadnew  = require( './casUploadnew' )
let casUploadbdat = require( './casUploadbdat' );
let casUploadhdat = require( './casUploadhdat' );
let casUploadAst = require( './casUploadAst' );
let computeDS = require( './computeDS' );
let computeDSAttach = require( './computeDSAttach' );
let filesCreate = require( './filesCreate' );
let filesPaginate = require( './filesPaginate' );
let casScoreHdat = require( './casScoreHdat' );
let casScoreAst = require( './casScoreAst' );
let casScoreAstFail = require( './casScoreAstFail' );
let foldersPaginate = require( './foldersPaginate' );
let logonTest = require( './logonTest' );
let modelRepoRoot = require( './modelRepoRoot' );
let modelDestinationCas = require( './modelDestinationCas' );
let masScore = require( './masScore' );
let identities = require( './identities' );
let mlPipeline = require( './mlPipeline' );
let mlPipelinePublish = require( './mlPipelinePublish' );
let masList =require( './masList' );
let casSubmit = require( './casSubmit' );
let computeTables = require( './computeTables' );
let computeWithPreamble = require( './computeWithPreamble' );

module.exports = {
	addServices,
	casSession,
	casSessionAttach,
	casEcho,
	casDSandFetch,
	casDSandFetch2,
	casDSandFetch2v2,
	casFetchData3,
	casTables,
	casUploadCsv,
	casUploadProgram,
	casUploadProgram2,
	casUploadCsv2,
	casUploadCsv3,
	casUploadnew,
	casAppendTable1,
	casUploadbdat,
	casUploadhdat,
	casUploadAst,

	computeDS,
	computeDSAttach,
	computeTables,
	computeWithPreamble,
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

	identities,
	mlPipeline,
	mlPipelinePublish,

	masList,
	casSubmit

};