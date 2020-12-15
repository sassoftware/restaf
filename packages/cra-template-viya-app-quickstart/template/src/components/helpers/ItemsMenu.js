import React, {useState, useEffect}  from 'react';
import ScrollMenu from './ScrollMenu';
import ItemsListMenu from './ItemsListMenu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useAppContext} from '../../useAppContext';

function ItemsMenu(props) {
    let {showMenu, onSelect} = props;
    let {store} = useAppContext();
    const [state, setState] = useState(null);
    const  _onScroll = (rel) => {
       let raflink = (rel === 'self') ? state.links('self') : state.scrollCmds(rel);
        store.apiCall(raflink)
            .then (r => {
                setState(r);
            })
            .catch( err => {
                throw err;
            })
    }

    useEffect(()=> {
        setState(props.result);
    }, [props]);

    const _show = () => {
        let show = (
            <div>
                <Paper>
                <Grid container spacing={3} direction="column">
                    <Grid item>
                    {showMenu === true ? <ScrollMenu folder={state} refresh={false} onSelect={_onScroll}/> : null}
                    </Grid>
                </Grid>
                <Grid item>
                    <ItemsListMenu result={state} onSelect={onSelect} />
                </Grid>

                </Paper>
            </div>
        );
        return show
    }
    return (state !== null) ? _show() : null;
}
export default ItemsMenu;