/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import cellEdit from "./cellEdit";
async function updateValue (name, value, appEnv,rowIndex) {
  let index = rowIndex||0;
  let {_data, status} =  await cellEdit(name, value, index, null, appEnv);
  debugger;
  return status;
}
export default updateValue;