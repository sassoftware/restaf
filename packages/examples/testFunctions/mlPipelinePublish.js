/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function mlPipelinePublish (testInfo){
    let { store, logger } = testInfo;
    let { mlPipelineAutomation} = await store.addServices('mlPipelineAutomation');
    let l = mlPipelineAutomation.links().keySeq();
    console.log(JSON.stringify(l, null,4));

    let projects = await store.apiCall(mlPipelineAutomation.links('collection'));
    let size = projects.itemsList().size;
    console.log(size);
   
    let payload = {
        qs: {
            action         : 'publish',
            destinationName: 'maslocal'
        },
        headers: {
            Accept: 'application/vnd.sas.analytics.ml.pipeline.automation.project+json'
        }
    };
   
   if (projects.itemsList().size > 0){
    let rafLink = projects.itemsCmd(projects.itemsList(0), 'publishChampionModel');

    let r = await store.apiCall(rafLink,payload);
    console.log(r.headers('location'));
   } else {
       console.log('No models found');
   }
   
    
    
    return 'done';

};
