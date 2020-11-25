/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


import caslRun         from './caslRun';
import caslRunBase     from './caslRunBase';
import caslScore       from './caslScore';
import caslDescribe    from './caslDescribe';
import casSetup        from './casSetup';
import casActionRun    from './casActionRun';

import casFetchData    from './casFetchData';
import casTableToJson  from './casTableToJson';

import computeRun       from './computeRun';
import computeSetup     from './computeSetup';
import computeSummary   from './computeSummary';
import computeResults   from './computeResults';
import computeFetchData from './computeFetchData';
import computeFileContent from './computeFileContent';

import findReport      from './findReport';
import getReportImage  from './getReportImage';
import getReportUri    from './getReportUri';

import getSasTableRows from './getSasTableRows';


import jesSetup        from './jesSetup';
import jesRun          from './jesRun';
import jesSummary      from './jesSummary';

import jsonToDict      from './jsonToDict';

import masSetup        from './masSetup';
import masDescribe     from './masDescribe';

import masRun          from './masRun';
import masAddModel     from './masAddModel';

import decodeJwt       from './decodeJwt';

import casUpload       from './casUpload';
import uploadData      from './uploadData';


function lib () {
    return {
        caslRun     : caslRun,
        caslRunBase : caslRunBase,
        casSetup    : casSetup,
        casActionRun: casActionRun,
        // casTableToJson,
        casFetchData: casFetchData,

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

        decodeJwt: decodeJwt,
        
        casUpload : casUpload,
        uploadData: uploadData
    };
}
export default lib;
