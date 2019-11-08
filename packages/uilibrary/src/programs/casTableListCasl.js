/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function casTableListCasl () {
  let code =  `
    action table.fileInfo r=result/ 
       caslib=_args_.caslib;
    tbl = result.fileInfo;
    list  = {};
    i = 1;
    do row over tbl;
        n = find(row.name, '.sashdat');
        if (n gt 0) then do;
            name = substr(row.name, 1, n-1); 
            list[i] = {value=name, label=name};
            i = i + 1;
        end;
    end;

    send_response({casResults=list});
    `;
  return code;

}
export default casTableListCasl;