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

function fixResponse (response) {

    //
    // Ensure all header keys are lowercase
    //

    let headers = {};
    
    for (let k in response.headers) {
        //noinspection JSUnfilteredForInLoop
        let k1 = k.toLowerCase();
        //noinspection JSUnfilteredForInLoop
        headers[k1] = response.headers [k];
    }

    
    response.headers = headers;
    let cType = response.headers['content-type'];

    if (cType == null || typeof response.data.results === 'string') {
        return response;
    }

    // let contentType = cType.split(';') [0];
    let iLink = response.data.iconfig.link;

    fixCas(iLink, response);
    fixImages(iLink, response);
    fixReports(iLink, response);
    return response;
}

function fixImages (iLink, response){
    if (iLink.href.indexOf('reportImages/jobs') > 0) {
        if (response.data.results.hasOwnProperty('images') === true) {
            let images = response.data.results.images;
            let items = (Array.isArray(images) === true) ? [].concat(images) : Object.assign({}, images);
            items[0].id = 'image';
            response.data.results.items = items;
            delete response.data.results.images;
        }
    }
}
function fixCas (iLink, response){
    // special handling for cas


    if (iLink.rel === 'createSession' && iLink.responseType === 'application/vnd.sas.cas.session') {
        response.data.results.links = response.data.results.links.concat(fixCasSession(iLink, response.data.results));
        response.data.results.name2 = response.data.results.name.split(':')[0];
        
        // response.data.results       = { items: [ Object.assign( {}, response.data.results ) ] };
    }

    if (iLink.hasOwnProperty('itemType') && iLink.itemType === 'application/vnd.sas.cas.session.summary') {
        let items = response.data.results.items;
        let harray = iLink.href.split('/');
        harray.shift();
        let server = harray [ 2 ];
        // let pre   = `/casProxy/servers/${server}/cas/sessions`;

        let pre = `/${iLink.casHttp}/cas/sessions`
        for (let i = 0; i < items.length; i++) {
            let item = items [i];
            /* get rid of casManagement in front */
            let uri = `${pre}/${item.id}`;
            item.links = item.links.concat(casSessionLinks(uri));
            
        }
    }

    if (iLink.hasOwnProperty('customHandling')) {
        response.data.results = reduceCasResult(response.data.results);
        response.data.results = { items: Object.assign({}, response.data.results) };
        response.data.results.castomHandling = iLink.customHandling;
    }

    if ((iLink.href === '/casManagement/' || iLink.href === '/casManagement')
         && iLink.method === 'GET') {
        response.data.results.links.map(l => {
            if (l.rel === 'collection') {
                l.title    = 'servers';
                l.rel      = 'servers';
                l.patch    = 'cas';
            }
            return l;
        })
    }
    if (iLink.hasOwnProperty('patch') && iLink.rel === 'servers') {
        let items = response.data.results.items;

        for (let i = 0; i < items.length; i++) {
            let item = items [i];
            let name = item.name;
            let ll = item.links.map(l => {
                l.casHttp = `${name}-http`;
                return l;
            });
            item.links = ll;
        }
    }


}

function fixReports (iLink, response) {
    if (iLink.href === '/reports/reports' && iLink.method === 'GET') {
        let items = response.data.results.items;
        for (let i = 0; i < items.length; i++) {
            let reportUri = `/SASReportViewer/?reportUri=/reports/reports/${items[i].id}`;
            let l = {
                method  : 'GET',
                href    : reportUri,
                rel     : 'viewer',
                uri     : reportUri,
                type    : 'text/html',
                itemType: 'text/html',
                title   : 'Report Viewer',
                extended: true
            };

            items[i].links.push(l);
        }
    }
}

function fixCasSession (iLink, results) {

    return sessionLinks(iLink, results.id).concat(results.links);
}

function reduceCasResult (data){
    let tables = {} ;
    if (data.hasOwnProperty ('results') === false) {
        return data ;
    }
    let results = Object.assign({}, data.results);
    for (let k in results) {
        //noinspection JSUnfilteredForInLoop
        let o = results[ k ];
        if (o.hasOwnProperty('_ctb') === true  && o[ '_ctb' ] === true) {
            //noinspection JSUnfilteredForInLoop
            tables[ k ] = Object.assign({}, o);
            //noinspection JSUnfilteredForInLoop
            delete data.results[ k ];
        }
    }
    data.tables = tables;
    return data;

}

function sessionLinks (iLink, sessionId) {
    /**/

    let harray = iLink.href.split('/');
    let server = harray[harray.length - 2];
    // let uri = `/casProxy/servers/${server}/cas/sessions/${sessionId}`;
    let uri = `/${iLink.casHttp}/cas/sessions/${sessionId}`;
    return casSessionLinks(uri);
}
function casSessionLinks (uri){

    return  [
        {
            method        : 'POST',
            href          : `${uri}/actions`,/* payload: data:...., qs: {action: ...} */
            rel           : 'execute',
            uri           : `${uri}/actions`,
            responseType  : 'application/json',
            type          : 'application/json',
            itemType      : 'application/json',
            title         : 'Run CAS Action',
            customHandling: 'casExecute',
            extended      : true
        },
        {
            method        : 'GET',
            href          : `${uri}/isIdle`, /* need to convert true/false to busy and completed */
            rel           : 'state',
            uri           : `${uri}/isIdle`,
            responseType  : 'application/json',
            type          : 'application/json',
            itemType      : 'application/json',
            title         : 'state',
            customHandling: 'casState',
            extended      : true
        }
    ];
}

export default fixResponse;

