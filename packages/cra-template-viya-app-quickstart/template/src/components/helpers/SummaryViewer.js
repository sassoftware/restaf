/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { PropTypes } from 'prop-types';

import PropertyTable from './PropertyTable';

function SummaryViewer(props) {
    let { result, selectedItem, classes} = props;
    let d = result.items(result.itemsList(selectedItem), 'data').toJS();
    return <PropertyTable summary={d} classes={classes}></PropertyTable>
}

SummaryViewer.propTypes = {
/** object returned by store.apiCall */
    result: PropTypes.object.isRequired,
/** index of selected item in itemsList */
    selectedItem: PropTypes.number.isRequired
}
export default SummaryViewer;