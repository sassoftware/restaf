/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";
module.exports = function reduceCasResult (data) {
  let tables = {};
  if (data.hasOwnProperty("results") === false) {
    return data;
  }
  let results = Object.assign({}, data.results);
  for (let k in results) {
    //noinspection JSUnfilteredForInLoop
    let o = results[k];
    if (o.hasOwnProperty("_ctb") === true && o["_ctb"] === true) {
      //noinspection JSUnfilteredForInLoop
      tables[k] = Object.assign({}, o);
      //noinspection JSUnfilteredForInLoop
      // delete data.results[ k ];
    }
  }
  data.tables = tables;
  return data;
};
