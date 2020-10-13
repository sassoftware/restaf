/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

  'use strict';
let  Immutable = require('immutable');

function iGetResults (store, iroute, keyOnly, ...args) {

    let result;
    let route;
    let iquery  = [] ;
    let q;
    let serviceName;
    let folder;
    let path = [];
    
    if (args != null) {
        iquery = (Array.isArray(args [0]) === true) ? args[0] : args;
    }

    if (typeof iroute === 'string') {
        route = iroute;
        q           = route.split(':/');
        serviceName = q.shift();
        folder      = store.getState()[serviceName];
        path = [...q, ...iquery];

    } else {
        path = iquery;
        if (Immutable.Iterable.isIterable(iroute)) {
            folder = iroute;
        } else {
            return null;
        }
    }

    // should never happen but...
    if (folder == null) {
        return null;
    }

    result   = (path.length > 0) ? folder.getIn(path, null) : folder;

    if (result !== null) {
        if (keyOnly === true && Immutable.Iterable.isIterable(result) === true) {
            result = result.keySeq();
        }
    }

    return result;
}

export default iGetResults;