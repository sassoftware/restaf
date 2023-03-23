/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function text2Float (value, f) {
  // Attempting to allow objects as values
  if (typeof value === 'object') {
    return value;
  }
  let svalue = value;
  const t = f.Type.toLowerCase();
  if (typeof svalue === 'string' && (t === 'decimal' || t === 'number' || t === 'double' || t === 'float')) {
    svalue = parseFloat(value * 1.0);
    if (isNaN(value) === true) {
      value = 0;
    }
  }
  return svalue;
}
export default text2Float;
