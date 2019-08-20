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
function logLines (folder) {
    let dataL = folder.items();
    let outAll = '';
    dataL.map((data) => {
        let out;
        let line = data.get('line').replace(/(\r\n|\n|\r)/gm, "");
        if (line.length === 0) {
            line = '  ';
        }
        let type = data.get('type');
        if (type === 'title') {
            out = `<h2 className="${type}"> ${line} </h2>`;
        } else {
            out = `<p class="${type}"> ${line} </p>`;
        }
        outAll = outAll + out;
    });
    return outAll;
}
export default logLines;