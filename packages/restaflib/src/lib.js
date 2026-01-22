/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


import caslRun         from './caslRun.js';
import caslRunBase     from './caslRunBase.js';
import caslScore       from './caslScore.js';
import caslDescribe    from './caslDescribe.js';
import casSetup        from './casSetup.js';
import casActionRun    from './casActionRun.js';

import casFetchData    from './casFetchData.js';
import casUpdateData   from './casUpdateData.js';
import casTableToJson  from './casTableToJson.js';

import computeRun       from './computeRun.js';
import computeSetup     from './computeSetup.js';
import computeSummary   from './computeSummary.js';
import computeResults   from './computeResults.js';
import computeFetchData from './computeFetchData.js';
import computeFileContent from './computeFileContent.js';

import findReport      from './findReport.js';
import getReportImage  from './getReportImage.js';
import getReportUri    from './getReportUri.js';

import getSasTableRows from './getSasTableRows.js';


import jesSetup        from './jesSetup.js';
import jesRun          from './jesRun.js';
import jesSummary      from './jesSummary.js';

import jsonToDict      from './jsonToDict.js';

import masSetup        from './masSetup.js';
import masDescribe     from './masDescribe.js';

import masRun          from './masRun.js';
import masAddModel     from './masAddModel.js';

//import casUpload       from './casUpload';
//import uploadData      from './uploadData';


function lib () {
    return {
        caslRun      : caslRun,
        caslRunBase  : caslRunBase,
        casSetup     : casSetup,
        casActionRun : casActionRun,
        // casTableToJson,
        casFetchData : casFetchData,
        casUpdateData: casUpdateData,

        computeRun        : computeRun,
        computeSetup      : computeSetup,
        computeSummary    : computeSummary,
        computeFetchData  : computeFetchData,
        computeFileContent: computeFileContent,
        computeResults    : computeResults,

        findReport    : findReport,
        getReportImage: getReportImage,
        getReportUri  : getReportUri,

        getSASTableRows: getSasTableRows,
        
        jesSetup  : jesSetup,
        jesRun    : jesRun,
        jesSummary: jesSummary,
        
        jsonToDict: jsonToDict,
        
        casTableToJson: casTableToJson,
        
        caslScore   : caslScore,
        caslDescribe: caslDescribe,

        masSetup   : masSetup,
        masAddModel: masAddModel,
        masDescribe: masDescribe,
        masRun     : masRun,
        
    //    casUpload : casUpload,
    //   uploadData: uploadData
    };
}
export default lib;
