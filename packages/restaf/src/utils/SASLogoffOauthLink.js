/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
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

'use strict';

import { request } from  '../serverCalls' ;

const SASLogoffOauthLink = function () {
    return (
        {
            logoff: request,
            link  : {
                href        : '/SASLogon/logout',
                method      : 'GET',
                rel         : 'logoff',
                responseType: 'application/json',
                uri         : '/SASLogon/logout'
            }
        } );

};
/*
 * redirectUri not specified - /SASLogon/oauth/token?
 */
export default SASLogoffOauthLink;
