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

import { setGoodStatus, setBadStatus } from '../utils';
import { tLinkStruct, itemsStruct } from '../utils/rootStruct';

const responseReducer  = (action, parentPath)  => {
    
    let response = null;
     /* */
     
    if (action.error === true) {
        response            = tLinkStruct('error', 'error');
        response.link       = action.config.href;
        response.runStatus  = 'error';
        response.statusInfo = setBadStatus(action.payload);
        return response ;
    }

    let { results } = action.payload.data;
    let contentType = '';

    if (results.hasOwnProperty('accept') === true) {
        contentType = results.accept;
    } else if (action.payload.headers.hasOwnProperty('content-type') === true) {
        contentType = action.payload.headers['content-type'].split(';') [0].split('+json')[0];
    } else {
        if (action.payload.status === 204) {
            contentType = 'No Content';
        }
    }

    // results with a list of items
    if (results.hasOwnProperty('items')) {
        response  = itemsReducer (results , parentPath);
        response.resultType = (results.accept == undefined) ? contentType : results.accept;

    // result has links and data
    }  else if (results.hasOwnProperty('links')) { /* got just links */
        
        response = tLinkReducer(results.links, parentPath);
        let data = { ...results };
        delete data.links;
        // Need to handle the cases as in vnd.sas.data.row.set which return data with no items array

        for (let key in data){
            if (key !== 'version') {
                response.type = 'data'; // change type of link to data
                break;
            }
        }

        response.items = {
            resultType: 'data',
            data      : data,
            cmds      : null
        };
        response.resultType = contentType;

    // plain data case - no links at the top level
    } else {
        response = tLinkStruct('data', 'data');
        response.type       = 'data';
        response.resultType = contentType;
        
        response.items = {
            resultType: contentType,
        /* data      : (typeof results === 'string' || typeof results === 'boolean') ? results : Object.assign({}, results),*/
            
            data: (typeof results === 'object') ? Object.assign({}, results) : results,
			cmds: null,
		};
    }


    /* response.raw = Object.assign( {}, results );*/
    //noinspection JSUnresolvedVariable

    response.link       = action.config.link.href;
    response.runStatus  = 'ready';

    response.statusInfo = setGoodStatus(action.payload);
    let c  = action.config;
    let hc = action.payload.config;

    let temp      = hc.url.split('/');
    response.host = `${temp[0]}//${temp[2]}`;
    response.iconfig = {
        input: {
            link   : { ...c.link },
            payload: (c.hasOwnProperty('payload')) ?  Object.assign({},c.payload)  : {}
        },
        http: {
            url    : hc.url,
            payload: {
                headers: [].concat(hc.headers),
                data   : (hc.data == null) ? {}  : ((typeof hc.data === 'object') ? Object.assign({},hc.data) : hc.data),
                qs     : (hc.params == null) ? {} : ((typeof hc.params === 'object') ? Object.assign({},hc.params) : hc.params),
            }
        }
    };
    return response;

};

function tLinkReducer (iLinks, parentPath) {

    let r = tLinkStruct(parentPath[ parentPath.length - 1 ], 'links');
    if (iLinks === null || iLinks.length === 0) {
        return r;
    }


    r.links    = setupRelPaths(iLinks, parentPath, 'lcmds');
    r.type     = 'links';
    r.scrollCmds  = setupRelPaths(iLinks, parentPath, 'scrollCmds');

    return  r ;

}

function setupRelPaths (iLinks, parentPath, subType){
    let subCmds = ['next', 'prev', 'first', 'last'];
    let tlinks;

    if (subType === 'links') {
        tlinks = iLinks;
    } else if (subType === 'cmds' || subType === 'lcmds') {
        tlinks = iLinks.filter(l => !subCmds.includes(l.rel));
    } else if (subType === 'scrollCmds') {
        tlinks = iLinks.filter(l => subCmds.includes(l.rel));
    } else {
        tlinks = iLinks;
    }


    if (subType === 'lcmds') {
        subType = 'links';
    }
    let tSearchPath =  [...parentPath, subType];
    let linksMap = {};
    tlinks.map (l  => {
        let ts = [...tSearchPath, l.rel];
        if (l.hasOwnProperty('title') === false) {
            l.title = l.rel ;
        }
        let lx = {
            link       : { ...l },
            method     : l.method,
            route      : ts.join(':/'),
            parentRoute: [...parentPath].join(':/'),
            paginator  : subCmds.includes(l.rel)
        };
        linksMap[l.rel] = { ...tLinkStruct(l.title, subType), ...lx };

    });
    return linksMap ;
}

function itemsReducer (results, parentPath){

    let idList = [];
    let rows   = {};

    let response        = tLinkStruct(parentPath[ parentPath.length - 1 ], 'links');
    let itemsResponse   = itemsStruct();
    response.resultType = results.accept;
    response.details    = setDetails(results);


    if (results.hasOwnProperty('name')) {
        itemsResponse.name = results.name;
    }
    if (results.hasOwnProperty('links')) {
        response.links       = setupRelPaths(results.links, parentPath, 'lcmds');
        response.scrollCmds  = setupRelPaths(results.links, parentPath, 'scrollCmds');
    }

    if (Array.isArray(results.items) === false) {
        itemsResponse.data       = results.items;
        itemsResponse.resultType = results.accept;
        if (results.items.hasOwnProperty('customHandling')) {
            itemsResponse.type = results.items.customHandling;
            response.type      = results.items.customHandling;
        } else {
            itemsResponse.type = 'items';
            response.type      = 'items';
        }
        response.items = itemsResponse;

        return (response);
    }

    if (results.items.length === 0) {
        itemsResponse.resultType  = results.accept;
        itemsResponse.data        = [];
        itemsResponse.type        = 'itemsList';
        response.type             = 'itemsList';
        response.items            = itemsResponse;
        response.itemsList        = [];
        return (response);
    } else if  (results.items [0].hasOwnProperty('links')) {
        let index = -1;
        let prevName = ''; /* need for models since they allow duplicate names - ugh! */
        for (let item of results.items) {
            index++;
            let name;
            if  (item.hasOwnProperty('name2')) {
                name = item.name2;
            } else {
                name = (item.hasOwnProperty('name'))
                    ? item.name
                    : item.hasOwnProperty('id')
                           ? item.id
                           : `${index}`;
            }
            
            if (prevName === name) {
               let rev = (item.hasOwnProperty('id') === true) ? item.id : index;
               name = `${name}_${rev}`;
            } else {
                prevName = name;
            }
            idList.push(name);
          
            let tRoute  = [...parentPath,  'items', 'data', name] ;
            let rowcmds = setupRelPaths(item.links, tRoute, 'cmds');

            let data = { ...item };
            delete data.links;

            let row         = itemsStruct();
            row.type        = 'itemRow';
            row.name        = name;
            row.resultType  = (data.hasOwnProperty('contentType') === true) ? data[ 'contentType' ] : 'unknown';
            row.cmds        = rowcmds;
            row.data        = data;
            rows[name]      = row;
        }
        itemsResponse.data       = rows;
        itemsResponse.resultType = results.accept;
        
        itemsResponse.type   = 'itemsList';
        response.itemsList   = [...idList];
        response.type        = 'itemsList';
    } else {
        itemsResponse.data       = [...results.items];
        itemsResponse.resultType = results.accept;
        itemsResponse.type       = 'itemsArray';
        response.type            = 'itemsArray';
    }

    response.items  = itemsResponse;
    return response ;

}

function setDetails (results) {
    let r = {...results };
    if (r.hasOwnProperty('links')){
        delete r.links;
    }
    if (r.hasOwnProperty('items')) {
        delete r.items;
    }
    return r;
}

export default responseReducer;
