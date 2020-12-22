import React, { useEffect, useState, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import ItemsMenu from '../helpers/ItemsMenu';;
import MasRun from './MasRun';
import AlertDialog from './AlertDialog';
import {useAppContext} from '../../providers';

function MasList(props) {
    let { store, restaflib } = useAppContext();
    // let location = useLocation();
    // let { service, initialRel } = location.state;
    let service = 'microanalyticScore'
    let initialRel = 'modules'
    let [masControl, setMasControl] = useState(null);
    let [appInfo, setAppInfo] = useState({
        result: null,
        index: 0,
        name: null
    });
    let errInfo = null;

    const _setUp = async () => {
        
        let r = await store.addServices(service); //adding the microanalyticScore service
        let result = await store.apiCall(r[service].links(initialRel));
        let masControlx = await restaflib.masSetup(store, []);
        await restaflib.masAddModel(store, masControlx, [result.itemsList(0)]);
        debugger;
        return { result, masControlx };
    }

    useEffect(() => {
        _setUp()
            .then((x) => {
                debugger;
                setMasControl(x.masControlx);
                setAppInfo({ result: x.result, index: 0, name: x.result.itemsList(0)});
            })
            .catch((err) => {
                errInfo = {msg: err, title: "MasList Initialization"}
            })
    }, [service]);

    const _onSelect = (index, name, result) => {
        let n = (name == null) ? result.itemsList(0) : name;
        errInfo = null;
        debugger;
        restaflib.masAddModel(store, masControl, [n])
        .then (() => {
            debugger;
            if (masControl.steps[n] === null) {
                throw {Error: `Model ${n} not found. why?`}
            } 
            let t = {result: result, index: index, name: n};
            setAppInfo(t);

        })
        .catch( err => {
            errInfo = {msg: err, title: `On Seleting ${n}`};
        })
       
    }
    let errShow = null;
    if ( errInfo != null) {
        errShow = <AlertDialog title={errInfo.title} msg={errInfo.msg}/> 
        errInfo = null;
    }
    let show = (
        <Fragment>
            { appInfo.result !== null ?
                <Grid container spacing={5} direction="row" alignContent='space-around'>
                    <Grid item xs={4}>
                        <ItemsMenu result={appInfo.result} selected={appInfo.index} showMenu={true} onSelect={_onSelect} />
                    </Grid>
                    <Grid item xs={8}>
                        {(errShow !== null) ? errShow : <MasRun result={appInfo.result} index={appInfo.index} masControl={masControl}  />}
                    </Grid>
                </Grid>
                : null}
        </Fragment>
    );
    debugger;
    return show;

}

MasList.propTypes = {
    /**
     *
     * List all models in MAS
     *
     */
}
export default MasList;