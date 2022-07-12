/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function text2Float (value, f) {
    let svalue = value;
    if (typeof svalue === 'string' && (f.Type === 'decimal' || f.Type === 'number' || f.Type === 'double')) {
        svalue = parseFloat(value * 1.0);
        if (isNaN(value) === true) {
            value = 0;
        }
    }
    return svalue;
}
export default text2Float;