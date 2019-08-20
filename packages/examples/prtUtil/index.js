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

let Immutable   = require('immutable');
let errColors   = require('./errColors');
let stdColors   = require('./stdColors');
let titleColors = require('./titleColors');
let prettyjson  = require('prettyjson');

function printErr (msg) {
    let msg1 = (typeof msg === 'object') ? msg : {Error: msg}
    console.log(prettyjson.render(msg1, errColors)) ;
}

function print (msg, title){
    if (title) {
        printTitle(title);
    }
    console.log(prettyjson.render(msg, stdColors)) ;
}

function printTitle (msg){
    console.log('\n');
    console.log(prettyjson.render(msg, titleColors)) ;
}

function view (f , title) {
    if (f.type === 'itemsList') {
        viewList(f.type, f.itemsList(), title);
    } else if (f.type === 'links') {
        viewLinks(f.type, f.links(), title);
    } else {
        printTitle({ Type: `${f.type}  ResultType: ${f.resultType}`});
        if (f.links().size > 0) {
            viewLinks(f.type, f.links(), title);
        }
        printObj(f.items(), title);

    }
}

function viewList (type, itemsList, title) {
    printTitle({title: `${title}  type: ${type}  size: ${itemsList.size}` });
    if (itemsList.size > 0) {
        print(itemsList.toJS());
    } else {
        print({info: 'List is empty'});
    }
}

function viewLinks  (type, itemsList, title) {
    printTitle({title: `${title}  type: ${type} size:  ${itemsList.size}` });
    itemsList.forEach((l, k) => {
        print({rel: k }) ;
    })
}

function printObj (d, title) {
    let d1 = (Immutable.Iterable.isIterable(d)) ? d.toJS():
             (typeof d === 'object') ? d : {value: d};
    print(d1, title);
}
module.exports = {view, viewList, viewLinks, printObj, printErr, print, printTitle};