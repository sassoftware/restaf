/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

module.exports = async function createFile (testInfo) {
    let { store, logger } = testInfo;
    let { files } = await store.addServices('files');
    let name = 'geekname';
    let payload = {
        data   : { me: 'hi there'},
        headers: {
            // 'Content-Disposition': `inline; form-data; filename=${name} name=${name}`,
            'Content-Disposition': `text/plain`,
            'content-type'       : `text/plain`
        }
    };
    //create a file
    let createCmd = files.links('create');
    let newFile = await store.apiCall(createCmd, payload);
    let c = await store.apiCall(newFile.links('content'));
    logger.info(c.items());
    let uri = newFile.links('self', 'link', 'uri');
    logger.info(uri);
  
    // set name and other attributes
    let p = {
        data: {
            name: name,
            description: 'stuff',
            properties: {
                newprop: 'tttt'
            }
        },
        headers: {
            'if-unmodified-since': newFile.headers('last-modified')
        }
    }

    console.log('after update');

    let updated = await store.apiCall(newFile.links('update'), p);
    console.log(updated.items().toJS());

    p = {
       qs: {
        filter: `contains(name, "${name}")`
       }
    };
    let selection = await store.apiCall(files.links('files'), p);
    console.log(selection.itemsList().toJS());

    return 'done';

    };
