/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";
import React from "react";
import Select from "react-select";

import CasTableBrowserp from "./CasTableBrowserp";
import runCasl from '../lib/runCasl';

function CasTableSelectorp (props) {
  let { store, session } = props;

  const { useState, useEffect } = React;

  let [caslibList, setCaslibList] = useState([]);
  let [tableList, setTableList] = useState([]);

  let [caslib, setCaslib] = useState(null);
  let [name, setName] = useState(null);

  let [errors, setErrors] = useState(null);
  let [fullName, setFullName] = useState(null);
;
  const _onCaslib = selectedValues => {
    setCaslib(selectedValues);
    setTableList([]);
    setName(null);
    setFullName(null);
  };

  const _onName = selectedValues => {
    setName(selectedValues);
  };

  const _onSubmit = () => {
    if (caslib === null || name === null) {
      alert("Missing Information");
      return;
    }
   //  setFullName(caslib.value + "." + name.value);
   setFullName({caslib: caslib.value, name: name.value});
  };

  // get list of caslibs
  useEffect(() => {
    ;
    runCasl(store, session, ['caslibListCasl'], null)
      .then(actionResult => {
        setCaslibList(actionResult);
        ;
        setErrors(null);
      })
      .catch(err => {
        setErrors(JSON.stringify(err));
      });
  }, []);

  // get list of tables on selected caslib
  useEffect(() => {
    if (caslib == null) {
      return;
    }
    runCasl (store, session, ['casTableListCasl'], { caslib: caslib.value })
      .then(actionResult => {
        setTableList(actionResult);
        setErrors(null);
      })
      .catch(err => {
        setErrors(JSON.stringify(err));
      });
  }, [caslib]);

  ;
  let show = 
    <div className="container">
     <form className="form-horizontal">
      <div className="form-group form-group-sm">

        <div className="col-md-6">

          <div className="form-group">
            <small id="caslibl"> Caslib</small>
            <Select
              value={caslib}
              onChange={_onCaslib}
              options={caslibList}
              closeMenuOnSelect={true}
            />
          </div>
        </div>

        <div className="col-sm1">
        </div>
        
        <div className="col-sm-6">
          <div className="form-group">
            <small id="namel"> Table</small>
            <Select
              value={name}
              onChange={_onName}
              options={tableList}
              closeMenuOnSelect={true}
            />
          </div>
        </div>
      </div>
      <div>
        {errors}
      </div>

      </form>
      <br/>
      <div>
      <button className="btn btn-primary" onClick={_onSubmit}>
        browse
      </button>
      </div>
      <br/>
      <br/>
      <div>
        {(fullName !== null) ? <CasTableBrowserp store={store} session={session} table={fullName} from={1} count={20} format={true} />: null}
      </div>

    </div>
  ;

  return show;
}

export default CasTableSelectorp;