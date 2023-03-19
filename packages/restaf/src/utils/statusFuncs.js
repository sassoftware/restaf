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

exports.setGoodStatus = function (payload) {
    return ({
        status    : payload.status,
        statusText: payload.statusText,
        detail    : ' ',
        error     : false
    });
};


exports.setBadStatus  = function (payload) {
    let code = 0 ;
    let detail = ' ';
    if (payload.hasOwnProperty('response') && payload.response != null) {
        code = payload.response.status;
        detail = (payload.response.hasOwnProperty('data')) ? payload.response.data : payload.response.statusText;
    }
   return ({
       status    : code,
       statusText: payload.message,
       detail    : detail,
       error     : true
   });

};
