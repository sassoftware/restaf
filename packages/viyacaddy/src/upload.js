/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
let {casUpload } = require('@sassoftware/restaflib');

module.exports = async function upload (store, args) {
    let session = null;
    try {
        let servers = store.getAppData('servers').toJS();
        session = await store.apiCall(servers.itemsCmd(servers.itemsList(0), 'createSession'));
        await casUpload(store, session, args.options.file, args.options.output, true, null);
        await store.apiCall(session.links('delete'));
        return `Import of ${args.options.file} as ${args.options.output} completed`;
    } catch (err) {
        if (session !== null) {
            await store.apiCall(session.links('delete'));
        }
        throw err;
    }
   
};
