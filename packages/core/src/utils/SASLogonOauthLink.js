/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */


import { trustedGrant, keepAlive, request } from  '../serverCalls' ;
import { VIYA_LOGON_PASSWORD } from '../actionTypes';

const SASLogonOauthLink = function (type) {

    
    if (type === VIYA_LOGON_PASSWORD || type == undefined) {
        return (
        {
            logon: trustedGrant,
            link : {
                href        : '/SASLogon/oauth/token',
                method      : 'POST',
                rel         : 'logon',
                responseType: 'application/json',
                type        : 'application/x-www-form-urlencoded',
                uri         : '/SASLogon/oauth/token'
            }
        });
    } else {
        return (
        {
           keepAlive: keepAlive
        });
    }
};

const SASLogoffOauthLink = function () {
    return (
        {
            logoff: request,
            link  : {
                href        : '/SASLogon/logout',
                method      : 'GET',
                rel         : 'logon',
                responseType: 'application/json',
                uri         : '/SASLogon/logout'
            }
        });

};

const SASKeepAlive = function () {
    return {

    };
};
/*
 * redirectUri not specified - /SASLogon/oauth/token?
 */
export { SASLogonOauthLink, SASLogoffOauthLink };
