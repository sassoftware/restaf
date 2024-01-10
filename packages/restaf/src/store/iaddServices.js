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
  'use strict';

import { ADD_SERVICE, API_CALL_PARALLEL } from '../actionTypes';

import getResults   from './getResults';
import extendFolder from './extendFolder';
import injectAsyncReducers  from '../reducers/injectAsyncReducers';
import baseReducer          from '../reducers/baseReducer';
import readXsrfData from './readXsrfData';

const iaddServices = ( store, services )  => {
    return new Promise( ( resolve, reject ) => {

        //
        // Add a reducer for each service
        //

        services.forEach ( service => {
            injectAsyncReducers( store, service, baseReducer( service ) );
        } );
     
        //
        // Create actionArray for the services
        //
        let actionArray = services.map( service => {
            let s = {
                type: ADD_SERVICE,
                link: {
                    method      : 'GET',
                    href        : '/' + service + '/',
                    rel         : 'root',
                    type        : 'application/vnd.sas.api+json',  
                    responseType: 'application/json, application/vnd.sas.api+json',
                    uri         : '/' + service + '/'
                },
                logonInfo  : null,
                tLink      : null, /* null indicates root of service */
                serviceName: service,
                route      : service,
                
                storeConfig: store.config
            };
            //to support PuP / workbench
            if ( service == 'compute' && store.config.options.computeServerId != null 
                 && store.config.options.computeServerId.trim().length > 0) {
                    console.log('assuming workbench');
                    s.link.href = '/compute/servers/' + store.config.options.computeServerId + '/';
                    s.link.url  = s.link.href;
            }
      
            return s;
        } );
        
        //
        // The first callback needs to be ignored
        //
        let start = true;

        //
        // subscribe function
        //
        let nextE = () =>  {

            
            if ( start ) {
                start = false;
                return;
            }

            let folders = {};
            let xsrfTokens = {};
            /* */
            //
            // check the status of the call.
            // if all of them completed then resolve this promise or reject if error as soon as
            // an error is detected.
            //

            let count = 0;
            for ( let i = 0; i < actionArray.length; i++ ) {
                //noinspection JSUnresolvedVariable
                let f = getResults( store, actionArray[i].route );
                if ( f !== null ) {
                    let runStatus = f.get( 'runStatus' );
                    if ( runStatus === 'error' ) {
                        unSubscribe();
                        let err = {
                            service: services[i],
                            detail : f.get( 'statusInfo' )
                        };
                        reject( err );
                    } else if ( runStatus === 'ready' ) {
                        count++;
                        let ff = extendFolder( store, f );
                        folders[services[i]] = ff;
                        xsrfTokens[services[i]] = readXsrfData(ff.headers, services[i]);
                    }
                }
            }
            
            
            if ( count === actionArray.length ) {
                unSubscribe();
                resolve( { folders: folders, xsrfTokens: xsrfTokens} );
            }
        };

        //
        // subscribe to store
        //
        let unSubscribe = store.subscribe( nextE );

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



    } );
};

export default iaddServices;