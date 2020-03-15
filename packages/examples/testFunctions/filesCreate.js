/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

module.exports = async function createFile (testInfo) {
    let { store, logger } = testInfo;
    let { files } = await store.addServices('files');
    let name = 'testname';
    let payload = {
        data   : { me: 'hi there'},
        headers: {
            'Content-Disposition': `inline; form-data; filename=${name} name=${name}`,
            'content-type'       : `application/json`
        }
    };
    debugger;
    let createCmd = files.links('create');
    let newFile = await store.apiCall(createCmd, payload);
    debugger;
    let uri = newFile.links('self', 'link', 'uri');
    logger.info(uri);
    // console.log(JSON.stringify(newFile.links(), null, 4));
    let c = await store.apiCall(newFile.links('content'));
    logger.info(c.items());
    return c.items().toJS();
    };
