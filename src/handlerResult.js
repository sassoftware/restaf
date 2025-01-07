/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Allow for a variety of handler forms

function handlerResult(obj, data, name, istatus) {
  // let istatus = { statusCode: 0, msg: '' };
  debugger;
  // use case (x) => data.x1=10;
  if (obj == null) {
      return [data, istatus];
  }
  // use case (x) => return [data, status]
  if (Array.isArray(obj) === true && obj.length === 2) {
    if (typeof obj[1] === "object") {
      let el = Object.keys(obj[1]);
      if (el.includes("statusCode") && el.includes("msg") && el.length === 2) {
        return r;
      }
    }
  } 

  // use case (x) => return object
  else if (typeof obj === "object") {
    if (obj._rowIndex != null && obj._modified != null) {
      return [obj, istatus];
    }
    else {
      return [data, istatus];
    }
  }


  
}

export default handlerResult;
