/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function mlPipeline (testInfo){
    let { store, logger } = testInfo;
    let { mlPipelineAutomation} = await store.addServices('mlPipelineAutomation');
    let l = mlPipelineAutomation.links().keySeq();
    console.log(JSON.stringify(l, null,4));


    let projects = await store.apiCall(mlPipelineAutomation.links('collection'));
    let size = projects.itemsList().size;
    console.log(size);
    console.log(JSON.stringify(projects.itemsCmd(projects.itemsList(0)),null,4));
    /*
    if (size > 0) {
        let m = projects.itemsList(0);
        console.log(`>>> ${m}`);
        console.log(JSON.stringify(projects.items(m, 'data'),null,4));
        let k = projects.itemsCmd(m).keySeq();
        console.log(JSON.stringify(k, null,4));
        let raflink = projects.items(m,'data', 'championModel');
        console.log(JSON.stringify(raflink, null,4));

        
        let detail = [];
        k.forEach (k1 => {
            let link = projects.itemsCmd(m, k1,'link','uri');
            console.log(`${k1},  ${link}`);
            let row = {rel: k1, uri: link};
            detail.push(row);
        })
        console.log(JSON.stringify(detail, null,4));
    }
        */
        


    return 'done';
};
