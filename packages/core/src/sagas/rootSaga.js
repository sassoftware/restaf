/*------------------------------------------------------------------------------------
 Copyright (c) SAS Institute Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/

'use strict';

import { all }           from 'redux-saga/effects'
import logonAction       from './logonAction';
import apiCallAction     from './apiCallAction';
import apiCallAllAction  from './apiCallAllAction';
import apiPollAction     from './apiPollAction';
import appDataAction     from './appDataAction';
// import keepAliveAction   from './keepAliveAction';


function* rootSaga () {
    yield all ([
        logonAction(),
        apiCallAction(),
        apiCallAllAction(),
        apiPollAction(),
        appDataAction()
        // keepAliveAction()
    ])
}
export default rootSaga;