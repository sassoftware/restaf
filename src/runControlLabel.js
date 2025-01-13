/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import cellEdit from "./cellEdit";
async function runControlLabel (...args) {
  let name;
  let rowIndex = 0;
  let appEnv = args[args.length - 1];
  if (appEnv.table == null) {
    [name] = args;
  } else {
    [name, rowIndex] = args;
  }
 
  if (['init','main', 'term'].includes(name) === false) {
    return {data: appEnv.data, status: {statusCode: 1, msg: 'name must be init, main or term'}};
  }

  let {_data, status} = await cellEdit(name, null, rowIndex, null, appEnv);
  return status;
}
export default runControlLabel;