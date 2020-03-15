/* eslint-disable no-undef */
/*
 * Copyright (c) SAS Institute Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *
 */

function logViewer (store, job, type) {
    store.apiCall(job.links(type))
         .then(folder => {
             let props = {
                 store : store,
                 folder: folder
             };
             setButtonColor(type);
             // eslint-disable-next-line no-undef
             rafuip.LogList(props, "#SASContent");
         })
         .catch(err => {
             debugger;
             alert(err);
         });
}

function odsViewer (store, job, type) {
    debugger;
    findODS(store, job)
        .then(ods => {
            setButtonColor(type);
            let props = {
                ods: ods
            };
            rafuip.ODS(props, "#SASContent");
        })
        .catch(err => {
            showAlert(err);
        });
}


function setButtonColor (type) {
    let ba = ['log', 'listing', 'ods'];

    ba.forEach(b => {
        if (b === type) {
            document.getElementById(type).style.color = 'black';
        } else {
            document.getElementById(b).style.color = 'grey';
        }

    });
}

async function findODS (store, job) {
    let htmDefault = `<h1> No ODS output </h1>`;
    let results = await store.apiCall(job.links('results'));
    let items = results.itemsList();
    if (items.size === 0) {
        return htmDefault;
    }

    let rafLink = null;
    items.map(r => {
        if (r.indexOf('.htm') > 0) {
            rafLink = results.itemsCmd(r, 'self');
        }
    });
    if (rafLink === null) {
        return htmDefault;
    } else{
        let odsResult = await store.apiCall(rafLink);
        return odsResult.items();

    }
}
/*
function logViewerx (store, folder) {
    let props = {
        store  : store,
        folder : folder
    };
    rafuip.LogList(props, "#log");
    return true;
}
*/
