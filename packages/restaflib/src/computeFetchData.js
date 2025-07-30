/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 *
 * @description Fetch data from a SAS Table
 * @async
 * @module computeFetchData
 * @category restaflib/compute
 * @param {object} store - restaf store
 * @param {computeSummary} computeSummary - Summary object created by computeSummary method
 * @param {string} table - name of the table
 * @param {string} scroll direction - null(to get first set)|next|prev|first|last
 * @param {object} payload - query values
 *
 * @returns {promise} - {columns: <column names>, rows: <data for rows> , scrollOptions: <available scroll directions>}
 */
async function computeFetchData(
  store,
  computeSummary,
  table,
  direction,
  payload,
  useRow
) {
  let data = null;
  let dataIsformatted = false;
  let tname = typeof table === "string" ? table : `${table.libref}.${table.name}`;
  tname = tname.toUpperCase(); /*to allow for compute service table info */

  let ipayload = payload != null ? { ...payload } : { qs: {} };
  ipayload.qs.includeIndex = true;
  let dataIsFormatted = ipayload.qs.format;
  let linkRel =(useRow == null) ? "rows" : useRow;
  // is payload an override or is this an adhoc request(i.e user is ignoring scroll info)
  let adhoc = payload != null && direction == null ? true : false;

  // retrieve current info on this table(if any)
  let tableInfo = computeSummary.tables[tname];
  if (tableInfo != null) {
    // reset current on if this is an adhoc request.
    if (adhoc === true) {
      tableInfo.current = null;
    }
    //get column info 
    if (tableInfo.current === null || direction == null ||direction === "first") {
      let t1 = await store.apiCall(tableInfo.self);
      let colCount = t1.items().toJS()["columnCount"];
      // get columns explicitly since user can control this thru payload
      let qc = {qs: {start: 0,limit: colCount}};
      let columns = await store.apiCall(t1.links("columns"), qc);
      let schema = [];
      let items = columns.items().toJS();
    
      if (linkRel === "rows") {
        schema.push({
          name: "_index_",
          Column: "_Index_",
          Label: "Index",
          length: 8,
          type: "FLOAT",
          format: "BEST",
          informat: "BEST",
          custom: false,
          isFormat: false
          
        });
      }
      for (let cx in items) {
        let c = items[cx];
        let newcol = {
          name: c.name.toLowerCase(),
          Column: c.name.toLowerCase(),
          Label: c.data.label,
          length: c.data.length,
          type: c.data.type,
          format: (c.data.format != null) ? c.data.format.name : null,
          informat: (c.data.informat != null) ? c.data.informat.name : null,
          custom: false,
          isFormat: dataIsFormatted
        };
        let indx = ipayload.qs.includeIndex === true ? 1 : 0;
        schema[c.data.index + indx] = newcol;
      }
      // Now get data using rows or rowSet rel
      let result = await store.apiCall(t1.links(linkRel), ipayload);

      // If using linkRel of rows, convert the data to rowSet schema
      let rowsData = (linkRel === "rowSet") ? result.items('rows').toJS() : cells2RowSet(result);

      tableInfo.current = result;
      tableInfo.schema = schema;
      tableInfo.columns = columns;

      data = {
        columns: columns,
        schema: schema,
        rows: rowsData,
        scrollOptions: result.scrollCmds().keySeq().toJS(),
      };
    } else {
      let current = tableInfo.current;
      let dir = direction;

      if (direction === "next" && current.scrollCmds("next") === null) {
        dir = current.links("last") !== null ? "last" : null;
      }
      if (direction === "prev" && current.scrollCmds("prev") === null) {
        dir = current.links("first") !== null ? "first" : null;
      }
      data = {
        schema: tableInfo.schema,
        columns: tableInfo.columns,
        currentColumns: tableInfo.currentColumns,
        rows: [],
        scrollOptions: current.scrollCmds().keySeq().toJS(),
      };
      if (dir !== null && current.scrollCmds(dir) !== null) {
        let result = await store.apiCall(current.scrollCmds(dir), ipayload);
        tableInfo.current = result;
        let rowsData = (linkRel !== "rows") ? result.items('rows').toJS() : cells2RowSet(result);
        data = {
          schema: tableInfo.schema,
          columns: tableInfo.schema,
          rows: rowsData,
          scrollOptions: result.scrollCmds().keySeq().toJS(),
        };
      }
    }
  }
  return data;
}
// convert cells to rowSet
function cells2RowSet(result) {
  let rowsData = result.items().toJS().map((r) => {
    return r.cells;
  });
  return rowsData;
}

export default computeFetchData;

