/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Allow for a variety of handler forms

function handlerResult (r, data, name, istatus) {
   // let istatus = { statusCode: 0, msg: '' };
  
    // use case (x) => data.x1=10;
    if (r == null){
      {return [data, istatus]}
    } 

    // standard case return [data, status]
    if (Array.isArray(r) === true ) {
       return (r.length == 2) ? r : [data, istatus]
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
