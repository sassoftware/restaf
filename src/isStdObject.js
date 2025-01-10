/*
 * Copyright © 2022, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Verify the returned data conforms to defined state data

function isStdObject(obj, data, status, type,index, appEnv) {

  let r1 = data;
  let r2 = status;
  let stateData = appEnv.state.data[index];
  debugger;
  // for version 1 compatability - standard return [data, status];

  if (Array.isArray(obj) === true && obj.length === 2) {
    r1 = (typeof obj[0] === "object" && obj[0]._rowIndex != null && obj[0]._modified != null)
      ? obj[0]
      : stateData;
    r2 = objectIsStatus(obj[1], status);
  } else if (typeof obj === "object") {
     r2 = objectIsStatus(obj, status);
  }

  // first check if the current types were kept. If not revert to state data
  if (checkConsistency(r1, stateData) === false) {
    return [stateData, {statusCode: 2 , msg: 'Error: Inconsistent data types'}];  
  }
  // verify the same keys exist in data and r1(init allows additions)
  let inKeys = Object.keys(stateData);
  let outKeys = Object.keys(r1);
  if (inKeys.length !== outKeys.length) {
    console.log('Error: Cannot add keys to data. Can only be done in init');
    return [stateData, {statusCode: 2 , msg: 'Error: Cannot add keys to data. Can only be done in init'}];
  }
  // see if user added new compute columns to data(init case only)
  // will not really work when within prepformdata unless we call it recursively
  // not worth the research effort at this time
  /*
  let addons = outKeys.filter(x => !inKeys.includes(x));
  if (addons.length > 0) {
    let r = addComputedColumns(addons, r1, appEnv);
    if (r === false) {
      return [stateData, {statusCode: 2 , msg: 'Error in adding computed columns in init'}];
    }
  }
   */

  return [r1,r2];

  // functions
  function checkConsistency(a, b) {
    let r = true;
    for (let k in b) {
      if (typeof b[k] !== typeof a[k]) {
        console.log(`Error: Attempting to change the  typeof ${k}`);
        r = false;
      }
    }
    return r;
  }

  function objectIsStatus(obj, status) {
    let el = Object.keys(obj);
    return (el.includes("statusCode") && el.includes("msg") && el.length === 2) ? obj : status;
  }

  function addComputedColumns(columns, data, appEnv) {
    let r = true;
    let newColumns = {};
    columns.forEach(name => {
      let type;
      if (data[name] === null) {
        type = 'number';
      } else {
        type = typeof data[name];
        if (['number', 'string', 'boolean', 'array', 'object'].includes(type) === false) {
          console.log(`Error: ${type} for ${name} is not a supported type`);
          r = false;
        }
      }

      if (r === true) {
        newColumns[name] = {
          Column: name,
          Label: name,
          Type: typeof data[name],
          FormattedLength: 12,
          value: data[name]
        }
      }
    })

    if (r === true) {
      debugger;
      appEnv.appControl.editControl.customColumns = Object.assign(appEnv.appControl.editControl.customColumns, newColumns);
    }
    return r;
  }
}


export default isStdObject;