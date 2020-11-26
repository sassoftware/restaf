/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
  'use strict';
module.exports = function fixMlPipelineAutomation (response) {

  try {
    let items = unfreeze(response.data.results.items);
    for (let i = 0; i < items.length; i++) {
      let links = unfreeze(items[i].links)
      let c = items[i].championModel;
      if (c != null && c.links != null && c.links.length > 0){
        let clinks= unfreeze(c.links);
        for(let j = 1; j < clinks.length ; j++){
          let l = Object.assign({},clinks[j]);
          l.extended = true;
          links.push(l);
        }
        items[i].links = links;
      }
    }

    response.data.results.items = items;
  }
  catch (err) {
    console.log(err);
  }
};

function unfreeze (l) {
  let newLink = [];
  for(let i = 0; i < l.length; i++) {
    let newObj = Object.assign({}, l[i]);
    newLink.push(newObj);
  }
  return newLink;
}
