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

"use strict";

// Pagination

module.exports = async function foldersPaginate (testInfo) {

  let { store, logger } = testInfo;

  let { folders } = await store.addServices("folders");
  console.log(folders.itemsList().toJS());


  let foldersList = await store.apiCall(folders.links("folders"));
  // logger.info(foldersList.itemsList().toJS());
  console.log(foldersList.itemsList().toJS());
  let next;
  // do this loop while the service returns the next link or counter is 0

  while ((next = foldersList.scrollCmds("next")) !== null) {
    foldersList = await store.apiCall(next);
    console.log(foldersList.itemsList().toJS());
    // logger.info(foldersList.itemsList().toJS());
  }
  let payload = {
    qs: {
      filter: `eq(name,"sastest1")`
    }
  }
  
  foldersList = await store.apiCall(folders.links("folders"), payload);
  // logger.info(foldersList.itemsList().toJS());
  console.log(foldersList.itemsList().toJS());
  console.log(foldersList.items().toJS());

  let sublist = await store.apiCall(foldersList.itemsCmd('sastest1', 'members'));
  console.log(sublist.items().toJS());

  return "done";
};

