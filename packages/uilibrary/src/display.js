/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
let  Viewers = require('./viewers');
function display (Viewer, props, element){
    let ThisComponent = Viewers[Viewer];
    debugger;
    ReactDOM.render(<ThisComponent {...props} />, element);

}
export default display;