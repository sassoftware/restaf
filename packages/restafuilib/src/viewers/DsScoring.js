/* eslint-disable no-unused-vars */
/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import  { useState, useEffect, useRef } from 'react'; 
import slsExecute from '../lib/runCode';
// import {AppContext} from '../providers';
import ShowSelectors from '../helpers/ShowSelectors';
import EditScenario from '../helpers/EditScenario';
import ShowScore from '../helpers/ShowScore';

import Grid from '@material-ui/core/Grid';

function DsScoring (props) {

  // const appContext = useContext(AppContext);

  /*
  let appEnv = appContext.viya.appEnv;
  let store = appContext.store;
  ;
  */

  // const [routePath, setRoutePath] = useState(props.match.path);
  const [selectorValues, setSelectorValues] = useState(null);
  const [selectedValues, setSelectedValues]  = useState({});
  const [initialValues, setInitialValues] = useState(null);
  const [scenarioResult, setScenarioResult] = useState(null);
  const [modelName, setModelName] = useState(props.model.name);

  let {store, model} = props;
  // const [scenarios, setScenarioValues] = useState(null)
  const [errors, setErrors] = useState('loading...');

  ;

  const lastModel = useRef(null);

  useEffect(() => {
      lastModel.current = props.model.name;
  });


  // get initial values
  useEffect(() => {
  
    // get list of states and years - currently no refresh

      ;
   
      // setSelectedValues(null);
      setInitialValues(null);
      setScenarioResult(null);

      const initStep = async (store, model) => {
        let selectors = {};
        let defaultSelection = {};
        if (model.table.hasOwnProperty('name') === true) {
          let casResults = await slsExecute('selectors', store, model, {});
          for (let idvar in casResults){
            selectors[idvar] = makeSelectionList(casResults[idvar]);
            defaultSelection[idvar] = '';
          }
          setSelectorValues(selectors);
          setSelectedValues(defaultSelection);
          console.log(selectedValues);
        } else {
          setSelectorValues(null);
          setSelectedValues({});
        }

        let tempScenario = null;
        if (typeof  model.scenario === 'string') {
          let tresult = await slsExecute('describe',store, model, {});
          tempScenario = {};
          tresult.describe.forEach (m => {
            let cl = m.Name.toLowerCase().trim();
            if (m.Role !== 'Target') {
               tempScenario[cl] = '';
            }
          });
        } else {
          tempScenario = {...model.scenario};
        }
        setInitialValues({describe: {}, editRow: tempScenario});
        setErrors(null);
        lastModel.current = model.name;
      };
      
    const makeSelectionList = (invalue) =>  {
      let type = typeof invalue[0] === 'number' ? 'number': 'text';
      let options = invalue.map(v => {
        return { value: v, label: v, type: type};
      });
      return options;
    };

    setErrors('...Retrieving filter information');
    ;
    if (lastModel.current !== model.model.name) {
      initStep(store, model)
        .then (r => console.log(r))
        .catch(err => {
          ;
          setErrors(JSON.stringify(err));
        });
      }
  }, [modelName, props.model]);

    function handleChange (event) {
      console.log(event.target.name);
      console.log(event.target.value);
      let type = selectorValues[event.target.name][0].type;
      let value = (type === 'number') ? parseFloat(event.target.value) : event.target.value;
      setSelectedValues(
        {
          ...selectedValues,
          [event.target.name]: value
        }
      );

      }

  const onFilter = () => {
    setErrors('...Running');
    console.log(selectedValues);
    ;
    slsExecute('scenario', store, model, {filter: selectedValues})
    .then(casResults => {
      let t = scenarioData(casResults);
      console.log(t);
      setInitialValues(t);
      setErrors(null);
      ;
    })
    .catch(err => {
      ;
      console.log(err);
      setErrors(JSON.stringify(err));
    });
  };

  function scenarioData (casResults) {
    let oldrow = casResults.scenario[0];
    let describe ={};
    for (let k in oldrow) {
      let kl= k.toLowerCase();
      describe[kl] = oldrow[k];
    }

    let editRow = {};
    for(let k in model.scenario) {
      editRow[k] = describe[k];
    }

    return {describe: describe, editRow: editRow}; 
  }

  const getNewValues = (newValues) => {
    // let scenario = {...initialValues.describe, ...newValues};
    let scenario = {...newValues};
    console.log(scenario);
    setErrors('...Running');
    setScenarioResult(null);
    ;
    console.log(scenario);
    slsExecute('score', store, model, {scenario: scenario}, props.serverless)
    .then(casResults => {
         let results  = casResults[0];
         let target = model.target.toLowerCase();
         let score;
         for (let k in results) {
             if (k.toLowerCase() === target) {
             score = results[k];
             }
         }
      console.log(score);
      setScenarioResult(score);
      setErrors(null);
      ;
    })
    .catch(err => {
      ;
      console.log(err);
      setErrors(JSON.stringify(err));
    });
  };
  let show =
  <Grid container spacing={2} >
    <Grid item xs={12}>
      <Grid container  spacing={2}>
        <Grid key={1} justify={"flex-start"} item>
          <ShowSelectors selectors={selectorValues}  selectedValues={selectedValues}
                        handleChange={handleChange} onSubmit={onFilter}/>
          {errors}
         
        </Grid>
        {(initialValues !==null) ? 
           <Grid key={2} justify={"flex-end"} item>
              <EditScenario data={initialValues.editRow} setScenario={getNewValues} />
          </Grid> : null }
        {(scenarioResult !== null) ? 
           <Grid key={3} item>
             <ShowScore model={model} score={scenarioResult}/>
            </Grid> : null }
      </Grid>
    </Grid>
  </Grid>;

  return show;
}

export default DsScoring;