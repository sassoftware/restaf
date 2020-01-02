/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/


import axios from 'axios';
import qs from 'qs' ;
import fixResponse from './fixResponse';
import Https from 'https';

// axios.defaults.withCredentials = true
axios.interceptors.response.use(
    function (response) {

        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);


/* X-Uaa-Csrf */
function trustedGrant (iconfig) {
      'use strict';
    
    let link   = iconfig.link ;
    
    let auth1 = Buffer.from(iconfig.clientID + ':' + iconfig.clientSecret).toString('base64');
    
    auth1 = 'Basic ' + auth1;
    let config = {
        method: link.method,
        url   : iconfig.host + link.href,

        headers: {
             Accept: link.responseType,

            'Content-Type': link.type,/* Axios seems to be case sensitive */

             Authorization: auth1
        },
        withCredentials: false,

        data: {
            'grant_type': 'password',
            username    : iconfig.user,
            password    : iconfig.password
            /*
            client_id    : iconfig.clientID,
            client_secret: iconfig.clientSecret
            */
        },

        validateStatus: function (status) {
            
            return status >= 200 && status < 300;
        },
        transformResponse: function (data) {
            return data ;
        },
        transformRequest: function (data) {
            return (qs.stringify(data));
        }
    };
    debugger;
    return (makeCall(config, iconfig, iconfig.pem, iconfig.rejectUnauthorized));
}


function request (iconfig) {
      'use strict';
    let { link, logonInfo } = iconfig;
    debugger;
    let iLink = {...link } ;
    let payload    = iconfig.hasOwnProperty('payload') ? iconfig.payload : null ;
    let iqs        = null;
    let idata      = null;
    let iheaders   = null;
    let ixsrf      = null;
    let casAction  = null;
 
    if (payload !== null) {
        casAction     = hasItem(payload, 'action');
        iqs           = hasItem(payload, 'qs');
        idata         = hasItem(payload, 'data');
        iheaders      = hasItem(payload, 'headers');
        ixsrf         = hasItem(payload, 'xsrf');
    }
    let url = `${logonInfo.host}${iLink.href}`;

    // handle casaction upload
    casAction  = (casAction != null) ? casAction.toLowerCase() : null;
    if (casAction === 'upload') {
        casAction = 'table.upload';
    }

    if (casAction !== null) {
        url = `${url}/${casAction}`;
    }

    if (iLink.hasOwnProperty('customHandling') && casAction !== null) {
        // casAction = casAction.toLowerCase();
        if (casAction === 'table.upload') {

            iLink.method       = 'PUT';
            iLink.type         =  'application/octet-stream';
            iLink.responseType = 'application/json';
        }
    }

    let config = {
        method           : iLink.method,
        url              : url,
        transformResponse: function (data) {
            return data ;
        },
        validateStatus: function (status) {
          
            return (status >= 200 && status < 300) || status === 302;
        },
    };

   if (logonInfo.token !== null) {
        config.headers = {
            Authorization: logonInfo.tokenType + ' ' + logonInfo.token
        };
   } else {
      config.headers = {};
      config.withCredentials = (iconfig.withCredentials == null)? true: iconfig.withCredentials;
   }

    let type   = fullType(iLink.type);
    if (iLink.hasOwnProperty('responseType')) {
        if (type !== null) {
           config.headers[ 'Content-Type' ] = type;
        }
        config.headers.Accept = fullType(iLink.responseType);
    } else if (type !== null) {
        config.headers.Accept = type;
        if (iLink.method === 'PUT' || iLink.method === 'POST' || iLink.method === 'PATCH') {
            config.headers[ 'Content-Type' ] = type;
        }
    }

    if (iheaders !== null) {
        for (let ih in iheaders) {
            //noinspection JSUnfilteredForInLoop
            if (ih.toLowerCase() === 'json-parameters') {
                //noinspection JSUnfilteredForInLoop
                config.headers[ih] = (typeof iheaders [ih] === 'object') ? JSON.stringify(iheaders[ih]) : iheaders[ih];
            } else {
                //noinspection JSUnfilteredForInLoop
                config.headers[ih] = iheaders[ih] ;
            }
        }
    }  
   
    if (ixsrf !== null) {
        let xsrfHeaderName = ixsrf['x-csrf-header'];
        config.xsrfHeaderName = xsrfHeaderName;
        config.headers[xsrfHeaderName] = ixsrf['x-csrf-token']; 
    }
    
    if (iqs !== null) {
        config.params = {...iqs};
    }

    config.data = (idata === null) ? {} : idata;
    config.maxContentLength = 2 * 10063256;
    

    return makeCall(config, iconfig, logonInfo.pem, logonInfo.rejectUnauthorized);
}

function makeCall (config, iconfig, pem, rejectUnauthorized) {
    debugger;
    // for nodejs apps use the nodejs env variables instead of restaf config.
    // NODE_TLS_REJECT_UNAUTHORIZED
    // SSL_CERT_FILE
    if (config.url.indexOf('https') !== -1) {
        let opt = {};
        if (pem != null) {
            opt.ca = pem; 
        }

        if (rejectUnauthorized != null) {
            opt.rejectUnauthorized = rejectUnauthorized;
        }

        let agent = new Https.Agent(opt);
        config.httpsAgent = agent;
    }
    

    return new  Promise ((resolve, reject)  => {
        axios(config)
            .then (response => {
            
                if (response.status === 302) {
                    console.log(status.headers.location);
                }
                parseJSON(response.data)
                    .then (data => {
                        iconfig.data = null;/* get rid of the payload*/
                        response.data = { results: data , iconfig: Object.assign({}, iconfig) };
                        if (data.hasOwnProperty('errorCode')) {
                            //noinspection JSUnresolvedVariable
                            response.status = response.data.results.httpStatusCode;
                            response.statusText = `errorCode: ${response.data.results.errorCode}`;
                            reject ({ response: response });
                        } else {
                            resolve (fixResponse(response));
                        }
                    })
                    .catch(() => {
                        iconfig.data = null;
                        response.data = { results: response.data , iconfig: Object.assign({}, iconfig) };
                        resolve (fixResponse(response));
                    });
            })
            .catch (error => {
                reject(error);
            });
        });
    }

function parseJSON (data) {
    //noinspection JSUnusedLocalSymbols
    return new Promise((resolve, reject) => {

        if (typeof data === 'object') {
            resolve(data);
        } else {
            let temp = data.replace(/\r?\n|\r/g, ' ');

            try {

               let odata = JSON.parse(temp);
               resolve(odata);
            } catch (err) {
                resolve(data);
            }
        }
    });
}

function hasItem (payload, name) {
    
    for (let k of Object.keys(payload)) {
        if (k.toUpperCase() === name.toUpperCase()) {
            return payload [ k ];
            }
        }
    return null;
}

function fullType (type) {

    let ntype = type;
    if ((ntype === undefined || ntype === null)) {
        ntype = null;
    } else {
        if (ntype.indexOf('application/vnd') !== -1) {
            if (ntype.indexOf('+json') === -1) {
                ntype = ntype + '+json';
            }
        }
    }
    return ntype;
}

// Code below is for experimenting.

function keepAlive (payload) {
  
    let config = {
        url   : payload.keepAlive,
        method: 'GET'
    };
    return axios(config)
        .then (r => true)
        .catch (e => false);
}



export { trustedGrant, keepAlive, request };
