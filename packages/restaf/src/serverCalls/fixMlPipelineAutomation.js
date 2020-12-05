/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
  'use strict';
module.exports = function fixMlPipelineAutomation (response) {

  // for reasons unknown the objects are "frozen" - so this ugly looking code
  try {
    let items = unfreeze(response.data.results.items);
    for (let i = 0; i < items.length; i++) {
      let links = unfreeze(items[i].links)
      
      if (links.findIndex(l => l.rel === 'championModel') === -1) {
        let c = items[i].championModel;
        if (c != null && c.links != null && c.links.length > 0){
          let clinks= unfreeze(c.links);
          for(let j = 0; j < clinks.length ; j++){
            let l = Object.assign({},clinks[j]);
            let h = l.href.split('?')[0];
            l.uri = h;
            l.href = h;
            l.type = 'application/json';
            if (l.rel === 'championModel' && l.method.toUpperCase() === 'GET') {
              l.type = 'application/vnd.sas.analytics.ml.pipeline.automation.project.champion.model';
            } else if (l.rel === 'championModel' && l.method.toUpperCase() === 'PUT') {
              l.responseType = '*/*';
            } else if (l.rel === 'scoreData') {
              l.responseType = 'application/json';
              l.type = 'application/vnd.sas.analytics.ml.pipeline.automation.score.data.input+json';
              l.responseType = 'application/vnd.sas.analytics.ml.pipeline.automation.score.data.output+json'
            }
            l.extended = true;
            links.push(l);
          }
          items[i].links = links;
        }
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
