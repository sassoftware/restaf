/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function setupProxy () {
   
    let code = `
        const { createProxyMiddleware } = require('http-proxy-middleware');
        module.exports = function(app) {
        let p = (process.env.HTTPS == null) ?  'no' : process.env.HTTPS.toLowerCase();
        let protocol = ( p === "YES || p === 'TRUE) ? 'https://' : 'http://';
        app.use(
            "/" + process.env.REACT_APP_APPNAME,
            createProxyMiddleware ({
                target: protocol + process.env.REACT_APP_TARGET,
                changeOrigin: true,
                /* if using unsigned certificates*/
                secure: false
                })
        );
        };
    `;
    return code;

};