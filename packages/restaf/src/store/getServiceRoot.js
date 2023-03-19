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
import extendFolder from './extendFolder';

function getServiceRoot (store, serviceName){
    let f = null;
    let list = store.getState();
        for (let key in list) {
        if (key === serviceName) {
            //noinspection JSUnfilteredForInLoop
            return extendFolder(store, list[ key]);
        }
    }
    return f ;
}
export default getServiceRoot;