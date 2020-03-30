/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
*/
'use strict';
//
// Notes: Convert Loglines to html
//

/**
 * Return log lines as html(async)
 * @module logLines
 * @param {object} folder - raf Object for log lines
 * 
 * @returns {string} log lines as HTML
 * 
 */
import colors from 'colors/safe';

async function logListLines (dataL) {
    ;
    dataL.map((data) => {
        let line = data.line.replace(/(\r\n|\n|\r)/gm, "");
        if (line.length === 0) {
           console.log(' ');
        }
        let type = data.type; 
        if (type === 'title') {
            console.log(colors.bold(line));
        } else {
            console.log(line);
        }
    });
    return;
}
export default logListLines;