/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Allow for a variety of handler forms

function handlerResult(r, data, name, istatus) {
  // let istatus = { statusCode: 0, msg: '' };
  debugger;
  // use case (x) => data.x1=10;
  if (r == null) {
      return [data, istatus];
  }

  // standard case return [data, status]
  if (Array.isArray(r) === true) {
    // return (r.length == 2) ? r : [data, istatus]
    if (r.length == 2) {
      if (typeof r[0] === "object") {
        return r;
      } else {
        // return [value, status]
        data[name] = r[0];
        return [data, r[1]];
      }
    } else {
      return [data, istatus];
    }
    // returning an object
  } else if (typeof r === "object") {
    // returning status
    debugger;
    if (r.statusCode != null && r.msg != null) {
      return [data, r];
    } else if (r._rowIndex != null) {
      // returning data
      return [r, istatus];
    } else {
      // returning some non-standard object - so ignore it.
      console.log("handlerResult: non-standard object returned");
      return [data, istatus];
    }
  } else {
    // returning a value
    if (name != null) {
      data[name] = r;
    }
    return [data, istatus];
  }
}
export default handlerResult;
