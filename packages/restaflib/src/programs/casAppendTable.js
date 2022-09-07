/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function casAppendTable() {
    let src = `
    rc = checkAndLoadTable(_args_.masterTable.caslib, _args_.masterTable.name);

    if (rc ne true) then do;
        results = {Errors= 'Unable to access ' ||_args_.masterTable.caslib||'.'||_args_.masterTable.name, statusCode=rc};   
        send_response({casResults=results});
        end; 
    else do;
        print '-------------------------------------------' || 'master exists';
    end;
    rc = checkAndLoadTable(_args_.setTable.caslib, _args_.setTable.name);
    if (rc ne true) then do;
        results = {Errors= 'Unable to access ' ||_args_.setTable.caslib||'.'||_args_.setTable.name, statusCode=rc};   
        send_response({casResults=results});

        end;
    else do;
       print '-------------------------------------------' || 'settable exists';
    end;

    setdata = _args_.setTable.caslib ||'.'||_args_.setTable.name;
    masterdata = _args_.masterTable.caslib ||'.'||_args_.masterTable.name;

    print '+++++++++++++++++++++++++++++++++++++++++++++++++++++ runcode';
    action datastep.runCode r=result status=rc/
     code='data ' ||masterdata||'(append=YES);set ' || setdata ||'; run;';
    print '===================================';
    if (rc.statusCode ne 0) then do;
      print 'bad code';
      results = {Errors= 'Unable to access ' ||_args_.setTable.caslib||'.'||_args_.setTable.name, statusCode=rc.statusCode}; 
    end; 
    else do;
     results = {msg= 'Append succeeded', statusCode=true};
     end;
    
    send_response({casResults = results});
    `;
    return src;
}
export default casAppendTable;