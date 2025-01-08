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

  } else {
     r1 = obj;
     r2 = status;
  }

  if (compareDataObject(Object.keys(r1), Object.keys(data)) === true) {
    let typeCheck = true;
    for (let k in r1) {
      if (typeof r1[k] !== typeof data[k]) {
        console.log(`Error: Attempting to change the  typeof ${k}. Retaining current value`);
        typeCheck = false;
        }
      }
    return (typeCheck === true) ? [r1, r2] : [data, status];
  } else {
    console.log('Error: You cannot change the schema of data. Retaining current values');
    return [data, status];
  }
}
function compareDataObject (a, b) {
 let r =  a.length === b.length &&
  a.every((element, index) => {
    let r1 = true;
    if (element !== b[index]) {
      console.log(`${element} cannot be added`); 
      r1 = false;
    }
    return r1;
  })
  return r;
}

export default isStdObject;