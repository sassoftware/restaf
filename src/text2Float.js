/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import typeValidation from "./typeValidation";
function text2Float(value, f) {
  
  let svalue = value;
  if (typeof value === "string") {
    let t = typeValidation(f.Type.toLowerCase());
    if (t == "int") {
      svalue = parseInt(value);
      if (isNaN(value) === true) {
        value = 0;
      }
    } else if (t === "number") {
      svalue = parseFloat(value * 1.0);
      if (isNaN(value) === true) {
        value = 0;
      }
    } else if (t === "boolean") {
        let vals = ["true", "yes", 1];
        let v = value.toLowerCase();
        if (vals.includes(v)) {
          svalue = true;
        } else {
          svalue = false;
        }
    } else if ( t === 'array' || t === 'object') {
      svalue = value;
    }
  }
  return svalue;
}
export default text2Float;
