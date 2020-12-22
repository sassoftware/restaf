import React , {useContext, Fragment} from 'react';
import { useLocation } from 'react-router-dom';
import {useAppContext} from '../../providers';
import SimpleDataForm from '../helpers/SimpleDataForm';
import { Grid } from '@material-ui/core';
function SimpleDataFormTest (props) {

  
  let {classes} = useAppContext();

  let data = [
    { name: 'Income', label: 'Income(x1000)', value: 10, type: 'slider', min: 0, max:860, scale: (x) => Math.log10(x)},
    { name: 'Resp', value :30, type: 'slider', min:0, max: 15},
    { name: 'Chol', value :30, type: 'slider', min:0, max:1200},
    { name: 'Infection', value :1.0, type: 'slider', min:0, max:210},
    { name: 'Income1', value: 10000, type: 'number', min: 8000, max:860000},
    { name: 'Resp1', value :30, type: 'number', min:0, max: 15},
    { name: 'Chol1', value :30, type: 'number', min:0, max:1200},
    { name: 'Infection1', value :1.0, type: 'number', min:0, max:210},
    
  ];
  const _userInputs = (d) => {
    console.log(d);
  }
  let show =
    <div className={classes.divmargin}>
      <Grid container alignItems="center" direction="row">
          <Grid xs={12} item >
              {/* <pre>{JSON.stringify(state.desc, null, 4)}</pre> */}
               <SimpleDataForm title={'Enter Values and Submit'} data={data} classes={classes} onSubmit={_userInputs} /> 
          </Grid>
  
        </Grid>
    </div>
  return show;
  }
export default SimpleDataFormTest;
