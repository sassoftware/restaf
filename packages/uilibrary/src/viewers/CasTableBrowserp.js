/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */



import React from "react";
import JSONPretty from "react-json-pretty";
import TableBrowser from "../helpers/TableBrowser";
import runCasl from '../lib/runCasl';

function CasTableBrowserp (props) {
  const { useState, useEffect, useRef } = React;
  const { store, session } = props;
  const [ from, setFrom ] = useState(props.from);
  const [ result, setResult ] = useState(null);
  const [ errors, setErrors ] = useState(null);

  let count = props.count;
  let lastTable = useRef("");

  useEffect(() => {
    lastTable.current = control.table;
  });

  let control = {
    table : props.table,
    from  : lastTable.current !== props.table ? props.from : from,
    count : count,
    format: props.format
  };

  useEffect(() => {
    const handleResult = r => {
      let rr = r.items("results", "casResults").toJS();

      setResult(rr);
      setErrors(null);
    };

    const handleErrors = err => {
      setErrors(err);
      setResult(null);
    };

    if (lastTable.current !== props.table) {
      setResult(null);
      setErrors(null);
    }
    debugger;
    
    runCasl(store, session, [ 'browseCasTableCasl' ], control, null)
      .then(r => handleResult(r))
      .catch(err => handleErrors(err));
  }, [ from, props.table ]);

  const _onScroll = direction => {
    let f =
      direction === "up" ? result.pagination.prev : result.pagination.next;
    setFrom(f);
    control = {
      table : props.table,
      from  : f,
      count : result.pagination.count,
      format: props.format
    };
  };

  let show = (
    <div className="container">
      <div className="form-group form-group-sm">
        <div className="col-md-6">
          <div className="form-group">
            <button
              className="btn btn-secondary"
              disabled={result === null || from === 1}
              onClick={() => _onScroll("up")}>
              up
            </button>
            <button
              className="btn btn-secondary"
              disabled={result === null || result.pagination.next === -1}
              onClick={() => _onScroll("down")}>
              down
            </button>
          </div>
        </div>
      </div>

      <div className="form-group form-group-lg">
        <div className="form-group">
          {result !== null ?  <TableBrowser data={result} /> :
           errors !== null ?  <JSONPretty data={errors} />   :
           null}
        </div>
      </div>
    </div>
  );
  return show;
}
export default CasTableBrowserp;
