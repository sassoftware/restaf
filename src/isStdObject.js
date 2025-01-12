/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Verify the returned data conforms to defined state data

function isStdObject(result, temp, data, status, type, appEnv) {

  let r1;
  let r2;
 
  //handle different cases
  // ignore "data" returned by user. User must modify data in place
  if (result == null ) {
    r1 = temp;
    r2 = status;
  }
  else if (Array.isArray(result) === true) {
    r1 = temp; // start ignoring data in [data, status]
    r2 = status;
    if (result.length === 2) {
      r2 = objectIsStatus(result[1], status); 
    }
  } else if (typeof result === "object") {
     r1 = temp;//ignore if data is returned
     r2 = objectIsStatus(result, status);
  } else {
    r1 = temp;
    r2 = status;
  }

  // did the user destroy temp? if so, revert to data in state
  // one final check
 
  if (objectIsData(r1) === false) {
    r1 = data;
  }


  // first to make sure the colmuns are consistent
  if (checkConsistency(r1, appEnv.state.columns, type) === false) {
    console.log('Error: The returned data has inconsistencies');
    return [data, { statusCode: 2, msg: 'Error: The returned data has inconsistencies' }];
  }

  return [r1, r2];


  // functions
  function checkConsistency(a, columns, type) {
    let r = true;
    debugger;
    for (let k in a) {
      if (columns[k] == null) {
        console.log(`Error: Attempting to add a new column ${k} in ${type}`);
        r = false;
      } else {
          if (columns[k].Type === 'array') {  
            if (Array.isArray(a[k]) === false) {
              console.log(`Error: Attempting to change the type of ${k} in ${type}`);
              r = false;
            }

          } else {
            if (typeof a[k] !== columns[k].Type) {
              console.log(`Error: Attempting to change the  typeof ${k} in ${type}`);
              r = false;
            }
          }
      }
    }
    return r;
  }

  function objectIsStatus(obj, status) {
    let el = Object.keys(obj);
    return (el.includes("statusCode") && el.includes("msg") && el.length === 2) ? obj : status;
  }

  function objectIsData(obj) {
    if (obj == null || typeof obj !== 'object') {
      return false;
    }
    let el = Object.keys(obj);
    return (el.includes("_rowIndex") && el.includes("_modified")) ? obj : false;
  }
}


export default isStdObject;