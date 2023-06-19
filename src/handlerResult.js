/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Allow for a variety of handler forms

function handlerResult (r, data, name) {
    let istatus = { statusCode: 0, msg: '' };
  
    // use case (x) => data.x1=10;
    if (r === undefined){
      {return [data, istatus]}
    } 

    // standard case return [data, status]
    if (Array.isArray(r) === true ) {
      if (r.length == 1) {
        r[1] = istatus;
      }
      return r;
    //  return data;
    } else if (typeof r === 'object') { 
      return [r, istatus];
    // returning a value (data.x1 > 10 ? 100 : 200)
    }  else { 
        if ( name != null) {
           data[name] = r;
        }
        return [data, istatus];
    }
    
  }
export default handlerResult;
