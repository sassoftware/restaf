
import React, { useState, useEffect, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Grid } from '@material-ui/core';
import SimpleDataForm from '../helpers/SimpleDataForm';
import QuickDialog from '../helpers/QuickDialog';
import {useAppContext} from '../../providers';
function MasRun(props) {
    const { result, index, masControl} = props;
    const [runState, setRunState] = useState({
        desc: null,
        newData: null,
        scoreResult: null,
        name : null
    })
    let errInfo = null;
    let {restaflib, store} = useAppContext();

    const _getDesc = async () => {
        let name = result.itemsList(index);
        
        await restaflib.masAddModel(store, masControl, [name]);
        
        let desc = restaflib.masDescribe(masControl, name, 'score');
        
        return {desc: desc, name: name}
    }

    const _userInputs = (newData, newInfo) => {
        
        // let t = {newData: newData, scoreResult: null};
        let errInfo = null;
        _score(newData)
            .then(r => {
                let t = {...runState};
                t.scoreResult = r;
                t.newData = newData;
                setRunState(t);
            })
            .catch(err => {
                errInfo = {msg: err, title: `Scoring ${runState.name}`};
            })
    }


    const _score = async (newData) => {
        let name = result.itemsList(index);
        let r = await restaflib.masRun(store, masControl, name, newData, 'score', 'execute');
        return r.toJS();
    }

    useEffect(() => {
        _getDesc()
            .then((r) => {
                setRunState({ desc: r.desc, scoreResult: null , name: r.name})
            })
    }, [index])
    
    let errShow = null;
    if ( errInfo != null) {
        errShow = <QuickDialog msg={errInfo.msg}/> 
        errInfo = null;
    }
    let showInput = null;
    if (runState.desc !== null) {
        if ( runState.desc.length > 0) {
            showInput = <SimpleDataForm title={'Enter Values and Submit'} data={runState.desc} onSubmit={_userInputs} /> ;
        } else {
            showInput = <QuickDialog msg={`No Input Values defined for ${runState.name}`}/>
        }
    }
    let show = 

        <Fragment>
            <Grid container justify="flex-start" alignItems="flex-start"spacing={6} direction="row">
                <Grid item s={5}>
                   {showInput}
                </Grid>
                <Grid item s={3}>
                    {runState.scoreResult !== null ?
                        <SimpleDataForm
                            title='Results'
                            data={runState.scoreResult}
                            disabled={true}  /> : null}
                </Grid>
                {errShow !== null ? <Grid item s={3}> {errShow} </Grid>: null}
            </Grid>
        </Fragment>;

    return show;
}

MasRun.propTypes = {
    /** Run and display results from a MAS run */
    /** result from getting a list of models */
    result: PropTypes.object.isRequired,
    /** index of item in the list */
    index: PropTypes.number.isRequired,
    /** masControl - control from masSetup */
    masControl: PropTypes.object.isRequired
}
export default MasRun;