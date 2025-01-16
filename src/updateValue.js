/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import cellEdit from "./cellEdit";
async function updateValue (...args) {
  let name;
  let value;
  let rowIndex = 0;
  let appEnv;
  ;
  if (args.length === 3) {
    [name, value, appEnv] = args;
  } else {
    [name, value, rowIndex, appEnv] = args;
    rowIndex = rowIndex||0;
  }
  let result =  await cellEdit(name, value, rowIndex, null, appEnv);
  ;
  console.log('result', result);

  return result.status;
 
}
export default updateValue;