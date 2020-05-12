/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let {casUpload } = require('@sassoftware/restaflib');

module.exports = async function upload (store, servers, args) {
    let session = null;
    try {
        let casserver = servers.itemsList(0);
        session = await store.apiCall(servers.itemsCmd(casserver, 'createSession'));
        let r = await casUpload(store, session, args.options.file, args.options.output, true, null);
        await store.apiCall(session.links('delete'));
        return `Import of ${args.options.file} as ${args.option.output} completed`;
    } catch (err) {
        if (session !== null) {
            await store.apiCall(session.links('delete'));
        }
        throw err;
    }
   
};
