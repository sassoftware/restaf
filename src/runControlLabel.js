/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import cellEdit from "./cellEdit";
async function runControlLabel (name, appEnv, rowIndex) {
  let index = rowIndex||0;
  if (['init','main', 'term'].includes(name) === false) {
    return {data: appEnv.data, status: {statusCode: 1, msg: 'name must be init, main or term'}};
  }

  let {_data, status} = await cellEdit(name, null, index, null, appEnv);
  return status;
}
export default runControlLabel;