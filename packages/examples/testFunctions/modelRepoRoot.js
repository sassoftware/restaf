/*
* Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
module.exports = async function modelRepoRoot (testInfo){
    let { store, logger } = testInfo;
    let { modelRepository } = await store.addServices('modelRepository');

    let rels = modelRepository.links().keySeq();
    logger.info(rels);
    return 'done';
};
