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

import { ADD_SERVICE, API_CALL_PARALLEL } from '../actionTypes';

import getResults    from './getResults';
import  extendFolder from './extendFolder';
import  injectAsyncReducers  from './injectAsyncReducers'
import { reducer }           from '../reducers';
import { fromJS }            from 'immutable';

const addServices = (store, ...services)  => {
    return new Promise((resolve, reject) => {

        //
        // Add a reducer for each service
        //
        services.forEach (service => {
            if (injectAsyncReducers(store, service, reducer(service)) === false) {
                reject(fromJS({ Error: `${service}  exists` }));
            }
        });

        //
        // Create actionArray for the services
        //
        let actionArray = services.map(service => {
            return {
                type: ADD_SERVICE,
                link: {
                    method: 'GET',
                    href  : '/' + service + '/',
                    rel   : 'root',
                    type  : 'application/vnd.sas.api',
                    uri   : '/' + service + '/'
                },

                logonInfo  : null,
                tLink      : null, /* null indicates root of service */
                serviceName: service,
                route      : service
            };
        });

        //
        // The first callback needs to be ignored
        //
        let start = true;

        //
        // subscribe function
        //
        let nextE = () =>  {

            if (start) {
                start = false;
                return;
            }

            let folders = {};
            /* */
            //
            // check the status of the call.
            // if all of them completed then resolve this promise or reject if error as soon as
            // an error is detected.
            //

            let count = 0;
            for (let i = 0; i < actionArray.length; i++) {
                //noinspection JSUnresolvedVariable
                let f = getResults(store, actionArray[i].route);
                if (f !== null) {
                    let runStatus = f.get('runStatus');
                    if (runStatus === 'error') {
                        unSubscribe();
                        let err = {
                            service: services[i],
                            detail : f.get('statusInfo')
                        };
                        reject(err);
                    } else if (runStatus === 'ready') {
                        count++;
                        folders[services[i]] = extendFolder(store, f);
                    }
                }
            }

            if (count === actionArray.length) {
                resolve(folders);
            }
        };

        //
        // subscribe to store
        //
        let unSubscribe = store.subscribe(nextE);

        //
        // dispatch the actionArray
        //

        //
        // interval is a place holder for creating interval between calls
        // Yet to be implemented
        //

        store.dispatch(
            {
                type    : API_CALL_PARALLEL,
                interval: -1,
                actionArray
            }
        );



    });
};

export default addServices;