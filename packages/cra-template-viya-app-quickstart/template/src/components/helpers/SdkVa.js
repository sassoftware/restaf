import React from 'react';
import {PropTypes} from 'prop-types';
import { Fragment } from 'react';

function SdkVa (props) {
    let { host, folder, selectedItem } = props;
    let reportUri = folder.itemsCmd(folder.itemsList(selectedItem), 'self', 'link', 'uri');

    let show = <Fragment>
         <sas-report
            url={host}
            reportUri={reportUri}
            authenticationType="credentials"
            style={{width: "90vh", height: "90vh"}}
            >
        </sas-report></Fragment>;

    return show;
}

SdkVa.propTypes = {
/** url to Viya host */
    host        : PropTypes.string.isRequired,
/** Object returned by store.apiCall to reports*/
    folder      : PropTypes.object.isRequired,
/** Indexof the item of interest in the reports itemsList array */
    selectedItem: PropTypes.number.isRequired
    
}
export default SdkVa;
