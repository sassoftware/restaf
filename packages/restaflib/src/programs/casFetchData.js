/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function casFetchData () {
    let code =`
    results = casFetchData(_args_.table.caslib, _args_.table.name , _args_.from, _args_.count,  _args_.format, _args_.filter);   
    send_response({casResults = results});  
        
    function casFetchData(caslib, name, from, count, format, _args_.filter) ;    
     
       rc = checkAndLoadTable(caslib, name);
    
       if (rc ne true) then do;
         results = {Errors= 'Unable to access ' ||caslib||'.'||name, statusCode=rc};   
         return results;   
         end;  

        /*
         * get all table to get rowCount
         */

        action table.tableinfo r= result/    
            caslib = caslib    
            name   = name;    
     
        rowCount = result.TableInfo[1, 'rows'];    
        to       = min(from + count -1, rowCount);    
        
        /*
         * get column information
         */

        action table.columninfo r=infoResult /
            table = {caslib=caslib name=name};

        columns ={{Column='_Index_',ID=0,Type='double',RawLength=5,FormattedLength=5,NFL=0,NFD=0}};
        i = 2;
        do c over inforesult.columninfo;
           columns[i] = c;
           i = i + 1;
        end;
        
        /*
         * Fetch the current set of rows
         */

        action table.fetch r = result /    
            table = {caslib=caslib, name=name}   
            from= from to=to format=format  sasTypes=TRUE
            ;    

        /* 
         * create payload to return
         */

        i = 1;
        rows ={};
        do row over result.fetch;
          rr = {};
          j = 1;
          do key,v  over row;
            rr[j] = override(columns[j].Type, v);
            j = j + 1;
          end;
          rows[i] = rr;
          i = i + 1;
        end;

        pagePrev = max(from - count, -1);
        /*
        if ( to eq rowCount ) then do;    
            pageNext = -1;    
        end; 
        else do;
           pagePrev = max(to + ,rowCount);
        end;   
        */
       
        if ( to eq rowCount ) then do;    
            pageNext = -1;    
        end;    
        else do ;    
            pageNext = min(to + 1, rowCount);    
        end;   
        table = {caslib=caslib, name=name};
        pagination = {next= {from=pageNext, count=count, format=format, table=table}, prev={from=pagePrev, count=count, format=format, table=table}};

       /*return ({pagination = {table = {caslib=caslib, name=name}, prev=pagePrev, next=pageNext, count=count}, rc=0 , data = {schema=columns, rows=rows } } ); */

       return( 
         {pagination = pagination, data = {schema=columns, rows=rows }}
         );
    end;    
    
    
    /*
     * For non-primary column types set new content
     */

    function override(type, iv);
      if (type EQ 'varbinary')       then v = '...varbinary';
      else if (type EQ  'blob')      then v = '...blob';
      else if (type EQ 'table')      then v = '...table';
      else if (type EQ 'dictionary') then v = '...dictionary';
      else if (type EQ 'list')       then v = '...list';
      else if (type EQ 'isArray')    then v = '...array';
      else v = iv;
      return v;
      end;

      
    `;
    return code;
}
export default casFetchData;