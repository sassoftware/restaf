/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function setupProxy(appName) {
    
    let code = `
        const { createProxyMiddleware } = require('http-proxy-middleware');
        module.exports = function(app) {
        app.use(
            "/" + process.env.REACT_APP_APPNAME,
            createProxyMiddleware ({
                target: process.env.REACT_APP_TARGET,
                changeOrigin: true,
                })
        );
        };
    `;
    return code;

}