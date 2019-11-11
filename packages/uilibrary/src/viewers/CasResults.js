/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import NestedMenu from '../helpers/NestedMenu';

 function CasResults (props){
    const { useState, useEffect, useRef } = React;
    let {casResults, store, session} = props;
    let menus =[];
    
    for (let key in casResults) {
        if (key !== 'tables') {
            menus.push(key);
        } else {
            menus.push(casResults['tables'].keys);
        }
    }
    return <h1>casresult</h1>;
}