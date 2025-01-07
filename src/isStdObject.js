/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function isStdObject(obj, data, status) {

  // no return value from handlers
  if (obj == null) {
    return [data, status];
  }

  let r1 = null;
  let r2 = null;
  debugger;
  // standard return [data, status];
  if (Array.isArray(obj) === true && obj.length === 2) {
    if (typeof obj[0] === "object" && obj[0]._rowIndex != null && obj[0]._modified != null) {
      r1 = obj[0];
    } else {
      r1 = data;
    }
    let el = Object.keys(obj[1]);
    if (el.includes("statusCode") && el.includes("msg") && el.length === 2) {
      r2 = obj[1];
    } else {
      r2 = status;
    }
    debugger;
    return [r1, r2];

  }

  // use case (x) => return data
  if (typeof obj === "object" && obj._rowIndex != null && obj._modified != null) {
    return [obj, status];
  }

  // ignore all other cases and return [data, status]

  return [data, status];
}

export default isStdObject;