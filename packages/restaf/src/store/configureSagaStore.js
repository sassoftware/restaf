/*
 * ------------------------------------------------------------------------------------
 *   Copyright © 2023, SAS Institute Inc., Cary, NC, USA. *   you may not use this file except in compliance with the License.
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

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import injectAsyncReducers from '../reducers/injectAsyncReducers';


import createReducer from '../reducers/createReducer';

function configureSagaStore (config) {

    let sagaMiddleWare = createSagaMiddleware();

    // get default reducers
    let reducers = createReducer();
   
    let store = createStore(reducers,   
                            applyMiddleware(sagaMiddleWare));
    

    store.asyncReducers        = {};
    store.injectAsyncReducers  = injectAsyncReducers;
    store.apiCallNo            =  0;
    store.config               =  {...config};
    
    // start the sagas
   
    sagaMiddleWare.run(rootSaga) ;
    return store;
}
export default configureSagaStore;



