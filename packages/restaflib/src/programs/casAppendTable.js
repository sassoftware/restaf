/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function casAppendTable() {
    let src = `
    rc = checkAndLoadTable(_args_.masterTable.caslib, _args_.masterTable.name);

    if (rc ne true) then do;
        text = 'Unable to access ' ||_args_.masterTable.caslib||'.'||_args_.masterTable.name;   
        rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};
        exit(rx); 
    end; 
    
    rc = checkAndLoadTable(_args_.setTable.caslib, _args_.setTable.name);
    if (rc ne true) then do;
        text = 'Unable to access ' ||_args_.setTable.caslib||'.'||_args_.setTable.name; 
        rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};
        return rx;
    end;


    setdata = _args_.setTable.caslib ||'.'||_args_.setTable.name;
    masterdata = _args_.masterTable.caslib ||'.'||_args_.masterTable.name;

    action datastep.runCode r=result status=rc/
     code='data ' ||masterdata||'(append=YES);set ' || setdata ||'; run;';

    if (rc.statusCode ne 0) then do;
      exit(rc);
    end; 
    else do;
     results = {msg= 'Append succeeded', statusCode=true};
     end;
    
    send_response({casResults = results});
    `;
    return src;
}
export default casAppendTable;