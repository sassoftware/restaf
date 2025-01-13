/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import cellEdit from "./cellEdit";
async function updateValue (...args) {
  let name;
  let value;
  let rowIndex = 0;

  let appEnv = args[args.length - 1];
  if (appEnv.table == null) {
    [name, value] = args;
  } else {
    [name, value, rowIndex] = args;
  }
  let {_data, status} =  await cellEdit(name, value, rowIndex, null, appEnv);
  return status;
 
}
export default updateValue;