
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
   'use strict';

 
 // let fixImages = require( './fixImages' );
 // let fixReports = require( './fixReports' );
 // let casSessionLinks = require( './casSessionLinks' );
 // let reduceCasResults = require( './reduceCasResults' );
 // let fixMlPipelineAutomation = require( './fixMlPipelineAutomation' );

import fixImages from './fixImages';
import fixReports from './fixReports';
import casSessionLinks from './casSessionLinks';
import reduceCasResults from './reduceCasResults';
import fixMlPipelineAutomation from './fixMlPipelineAutomation';
 function fixResponse ( response ) {
 
     //
     // Ensure all header keys are lowercase
     //
 
     let headers = {};
     
     for ( let k in response.headers ) {
         //noinspection JSUnfilteredForInLoop
         let k1 = k.toLowerCase();
         //noinspection JSUnfilteredForInLoop
         headers[k1] = response.headers [k];
     }
 
     
     response.headers = headers;
     let cType = response.headers['content-type'];
 
     if ( cType == null || typeof response.data.results === 'string' ) {
         return response;
     }
 
     // let contentType = cType.split(';') [0];
     let iLink = response.data.iconfig.link;
     
     fixCas( iLink, response );
     if ( iLink.href.indexOf( "reportImages/jobs" ) > 0 ){
        fixImages( response );
     }
     if ( iLink.href === "/reports/reports" && iLink.method === "GET" ) {
        fixReports( response );
     }
   
     let il = iLink.href.split( '?' )[0];
     if ( il === "/mlPipelineAutomation/projects" && iLink.method === "GET" ) {
         fixMlPipelineAutomation( response );
     }
     return response;
 }
 
 // Plan:
 // step 1: propogate server name and cashttp info

 function fixCas ( iLink, response ){
     // special handling for cas
     let casProxyFlag = false;
     
     if ( response.data.hasOwnProperty( 'iconfig' ) ) {
         if ( response.data.iconfig.storeConfig != null ) {
             casProxyFlag = response.data.iconfig.storeConfig.casProxy;
         }
     }
   
     // do a refresh - mainly for reattaching to a cas session
    
     if ( ( iLink.rel === 'self' && iLink.type === 'application/vnd.sas.cas.session.summary' ) ||
         ( iLink.rel === 'createSession' && iLink.responseType === 'application/vnd.sas.cas.session' )
		) {
			response.data.results.links = response.data.results.links.concat( fixCasSession( iLink, response.data.results, casProxyFlag ) );
			response.data.results.name2 = response.data.results.name.split( ':' )[0];
		}

     if ( iLink.hasOwnProperty( 'itemType' ) && iLink.itemType === 'application/vnd.sas.cas.session.summary' ) {
         
         let items = response.data.results.items;
         let pre = `/${iLink.casHttp}/cas/sessions`;
         for ( let i = 0; i < items.length; i++ ) {
             let item = items [i];
             let uri = `/casProxy/servers/${iLink.server}/cas/sessions/${item.id}`;
             let urihttp = `${pre}/${item.id}`;
             
             item.links = item.links.map( l => {
                l.casHttp = iLink.casHttp;
                l.server  = iLink.server;
                return l;
            } );
             item.links = item.links.concat( casSessionLinks( uri, urihttp, iLink.casHttp, iLink.server, casProxyFlag ) );
             
         }
     }
 
     if ( iLink.hasOwnProperty( 'customHandling' ) ) {
         
         response.data.results = reduceCasResults( response.data.results );
         response.data.results = { items: Object.assign( {}, response.data.results ) };
         response.data.results.customHandling = iLink.customHandling;
     }
     
     //TBD: This could probbably be removed due to enhancements to casManagement
     if ( ( iLink.href === '/casManagement/' || iLink.href === '/casManagement' )
          && iLink.method === 'GET' ) {
         response.data.results.links = response.data.results.links.map( l => {
             if ( l.rel === 'collection' ) {
                 l.title    = 'servers';
                 l.rel      = 'servers';
                 l.patch    = 'cas';  
             }
             return l;
         } );
     }
     
     
     // A seperate loop in case casManagement fixes the issue
     if ( iLink.hasOwnProperty( 'patch' ) && iLink.rel === 'servers' ) {
         let items = response.data.results.items;
 
         for ( let i = 0; i < items.length; i++ ) {
             let item = items [i];
             let name = item.name;
             let ll = item.links.map( l => {
                 l.casHttp = `${name}-http`; /* save the http info to propogate to sessions */
                 l.server  = name;
                 return l;
             } );
             item.links = ll;
         }
     }
 
 
 }
 
 
 function fixCasSession ( iLink, results, casProxyFlag ) {
     
     // proprogate casHttp
     results.links = results.links.map( l => {
        l.casHttp = iLink.casHttp;
        l.server  = iLink.server;
        return l;
    } );
     return sessionLinks( iLink, results.id, casProxyFlag ).concat( results.links );
 }
 
 
 function sessionLinks ( iLink, sessionId, casProxyFlag ) {
     let uri = `/casProxy/servers/${iLink.server}/cas/sessions/${sessionId}`;
     let urihttp = `/${iLink.casHttp}/cas/sessions/${sessionId}`;
     // propgate server name also
     return casSessionLinks( uri, urihttp, iLink.casHttp, iLink.server, casProxyFlag );
 }
 
 
 export default fixResponse;
 
