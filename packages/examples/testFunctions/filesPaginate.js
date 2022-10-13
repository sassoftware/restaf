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

"use strict";

// Pagination

module.exports = async function filesPaginate (testInfo) {
  let { store, logger } = testInfo;

  let { files } = await store.addServices("files");

  let filesList = await store.apiCall(files.links("files"));
  logger.info(filesList.itemsList());

  // let next;
  // do this loop while the service returns the next link or counter is 0
  /*
  while ((next = filesList.scrollCmds("next")) !== null) {
    filesList = await store.apiCall(next);
    logger.info(filesList.itemsList());
  }
  */

  return "done";
};

