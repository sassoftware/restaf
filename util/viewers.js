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
let  util = require('../util');

function view (f , title) {
    util.print({rafObjectType: `${f.type}`});
    if (f.type === 'itemsList') {
        viewList(f.type, f.itemsList(), title);
    } else if (f.type === 'links') {
        viewLinks(f.type, f.links(), title);
    } else {
        util.printTitle({ Type: `${f.type}  ResultType: ${f.resultType}`});
        if (f.links().size > 0) {
            viewLinks(f.type, f.links(), title);
        }
        util.print(f.items().toJS(), title);

    }
}

function viewList (type, itemsList, title) {
    util.printTitle({title: `${title}  type: ${type}  size: ${itemsList.size}` });
    itemsList.map(v => util.print({ item: v }));
}

function viewLinks  (type, itemsList, title) {
    util.printTitle({title: `${title}  type: ${type} size:  ${itemsList.size}` });
    itemsList.forEach((l, k) => {
        util.print({rel: k }) ;
    })
}

function printObj (d, title) {
    util.print({title: `${title}` });
    console.log((typeof d === 'object') ? util.print(d) : {value: d});
}

module.exports = { view, viewList, viewLinks, printObj };