/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

let uuid = require('uuid');
module.exports = async function modelDestinationCas (testInfo){
    let { store, logger } = testInfo;
	let { modelPublish } = await store.addServices('modelPublish');
   // logger.info(modelPublish.links().keySeq());

    let r = await store.apiCall(modelPublish.links('destinations'));
   // logger.info(r);
    logger.info(r.itemsList());
    if (r.itemsList('testPublishjest') !== null) {
        logger.info('testPublishjest exists');
        await store.apiCall(r.itemsCmd('testPublishjest', 'delete'));
    } 
    let payload = {
        data: {
            
			name            : 'testPublishjestx',
			casServerName   : 'cas-shared-default',
			casLibrary      : 'Public',
            destinationTable: 'jest' + uuid.v1(),
			destinationType : 'cas'
		}
	};
    logger.info(payload);
    r = await store.apiCall(modelPublish.links('createDestinationCAS'), payload);
    logger.info('after create');
    logger.info(r.items());

    let newList = await store.apiCall(modelPublish.links('destinations'));
    logger.info(newList.itemsList());

    // now upload a sasast and then try to publish it to the new cas destination

    await store.apiCall(newList.itemsCmd('testPublishjestx', 'delete'));

    
    return 'done';
};
