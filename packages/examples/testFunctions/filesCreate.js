/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let restaf = require('@sassoftware/restaf');
let { print } = require('@sassoftware/restaflib');
module.exports = async function createFile () {
    let store = restaf.initStore();
    let payload = require('./config')();
    await store.logon(payload);

    let { files } = await store.addServices('files');
    name = 'testname';
    payload = {
        data: { me: 'hi there'},
        headers: {
            'Content-Disposition': `inline; form-data; filename=${name} name=${name}`,
            'content-type': `application/json`
        }
    };
    debugger;
    let createCmd = files.links('create');
    let newFile = await store.apiCall(createCmd, payload);
    debugger;
    let uri = newFile.links('self', 'link', 'uri');
    console.log(uri);
    // console.log(JSON.stringify(newFile.links(), null, 4));
    let c = await store.apiCall(newFile.links('content'));
    print.object(c.items(), 'created file');
    return c.items().toJS();
    }
