/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
       
const { createProxyMiddleware } = require('http-proxy-middleware');
        module.exports = function (app) {
        let p = (process.env.HTTPS == null) ?  'no' : process.env.HTTPS.toLowerCase();
        let protocol = (p === 'yes' || p === 'true') ? 'https://' : 'http://';
        app.use(
            "/" + process.env.REACT_APP_APPNAME,
            createProxyMiddleware ({
                target      : protocol + process.env.REACT_APP_TARGET,
                changeOrigin: true,
                /* if using unsigned certificates*/
                secure      : false
                })
        );
        };
    