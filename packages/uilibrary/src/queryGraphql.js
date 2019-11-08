/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import axios from 'axios';

 module.exports = async function queryGraphql (host, graphqlQuery, filter,resultcb, errorcb){
   
    let data = {
        query: graphqlQuery
      };

    if (filter !== null){
      data.variables = filter;
    }

    let config = {
      url            : host + '/graphql',
      withCredentials: true,
      method         : 'POST',
      data           : data
    };
  
    try {
      let r = await axios(config);
      if (r.data.hasOwnProperty('errors') === true){
        if (errorcb != null) {
          errorcb(JSON.stringify(r.data.errors, null,4));
          return r.data.errors;
        }
      } else {
        if (resultcb != null) {
          resultcb(r.data.data.results);
          return r.data.data.results;
        }
      }
    } 
    catch (err){
      errorcb(JSON.stringify(err, null,4));
      return err;
    }
 };
