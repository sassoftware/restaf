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

axios.interceptors.response.use(
    function (response) {

        return response;
    },
    function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

function trustedGrant (iconfig) {
    'use strict';
    
    let link   = iconfig.link ;

    let auth1 = new Buffer(iconfig.clientID + ':' + iconfig.clientSecret).toString('base64');
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

    return (makeCall(config, iconfig));
}


function request (iconfig) {
    'use strict';
    let { link, logonInfo } = iconfig;

    let iLink = {...link } ;
    let payload    = iconfig.hasOwnProperty('payload') ? iconfig.payload : null ;
    let iqs        = null;
    let idata      = null;
    let iheaders   = null;
    let casAction  = null;

    if (payload !== null) {
        casAction     = hasItem(payload, 'action');
        iqs           = hasItem(payload, 'qs');
        idata         = hasItem(payload, 'data');
        iheaders      = hasItem(payload, 'headers');
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
            debugger;
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
        }
    };

    if (logonInfo.type !==  'server') {
        if (logonInfo.token !== null) {
            config.headers = {
                Authorization: logonInfo.tokenType + ' ' + logonInfo.token
            }
        } else {
            config.headers = {};
            config.withCredentials = true;
        }
    } else {
        config.headers = {};
        config.withCredentials = true;
    }
    let type   = fullType(iLink.type);
    if (iLink.hasOwnProperty('responseType')) {
        config.headers[ 'Content-Type' ] = type;
        config.headers.Accept            = fullType(iLink.responseType);
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

    if (iqs !== null) {
        config.params = {...iqs};
    }

/*
    if ( idata !== null ) {
        config.data = idata;
    }
*/
    config.data = (idata === null) ? {} : idata;

    // config.timeout = 60000;
    
    return makeCall(config, iconfig);
}

function makeCall (config, iconfig) {
    return new  Promise ((resolve, reject)  => {
        axios(config)
            .then (response => {
                parseJSON(response.data)
                    .then (data => {
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
                        response.data = { results: response.data , iconfig: Object.assign({}, iconfig) };
                        resolve (fixResponse(response));
                    })
            })
            .catch (error => {
                reject(error);
            })
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
    })
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

function implicitGrant (iconfig) {

    /* */
    let link = iconfig.link ;
    window.location.href = `${iconfig.host + link.href}?response_type=${link.responseType}&client_id=${iconfig.clientID}`;

    return new Promise.resolve()
}



export { trustedGrant, implicitGrant, request };
