/*------------------------------------------------------------------------------------
 Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ---------------------------------------------------------------------------------------*/
  ;

import {takeLatest, spawn } from 'redux-saga/effects' ;
import {KEEP_ALIVE} from '../actionTypes.js';
import {SASLogonOauthLink} from '../utils/index.js';


function* keepAliveAction () {
    
    let action = yield takeLatest( KEEP_ALIVE, keepAlivei );
    //ignore results for now - not sure what the corrective action is if this fails
    // yield put({ type: KEEP_ALIVE}););
}

function* keepAlivei ( payload ){
        let r = yield spawn ( test, payload );
        return r;
}

function test ( action ){
    let t = SASLogonOauthLink( 'keepAlive' );
    return t.keepAlive( action );
}
    

export default keepAliveAction ;