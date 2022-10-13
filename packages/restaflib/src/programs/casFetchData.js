/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function casFetchData () {
    let code =`
    print _args_;

    results = casFetchRows(_args_.table.caslib, _args_.table.name , _args_.start + 1, _args_.limit,  _args_.format, _args_.where);  
    send_response({casResults = results});  
        
    function casFetchRows(caslib, name, from, count, format, where) ;    
     
       rc = checkAndLoadTable(caslib, name);
    
       if (rc ne true) then do;
        text = 'Unable to access ' ||caslib||'.'||name;   
        rx = {severity=2,reason=6, status='error',statusCode=2, formatted=text};
        exit(rx);  
        end;  

        /*
         * get tableoinfo to get rowCount
         */

        action table.tableinfo r= result/    
            caslib = caslib    
            name   = name;    
     
        rowCount = result.TableInfo[1, 'rows'];
        to = from + count - 1;

        
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

        rows = {};
        if (from <=  rowCount) then do;
          action table.fetch r = result status=rcx/    
              table = {caslib=caslib, name=name where=where}   
              from= from to=to format=format  sastypes=true
              ;
          if (rcx.severity eq 2) then do;
            exit(rcx);
          end;
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
        end;

        currentCount = DIM(rows);
        pagination = {};   
        table = {caslib=caslib, name=name};

        pagination = setPagination(from, count, format, where, currentCount, rowCount, table);
    
        lastRequest={start=from-1, limit=count, format=format, currentCount=currentCount, 
                     rowCount=rowCount, where=where, table=table, version='3'};
       scrollOptions = getKeys(pagination);
       return( 
         {pagination = pagination, data = {schema=columns, rows=rows , scrollOptions=scrollOptions}, lasRequest=lastRequest}
         );
    end;    
    
    
    /*
     * For non-primary column types set new content
     */

    function setPagination(from, count, format, where,  currentCount, rowCount, table);


      prevStart = max(from - count - 1, 0);

      if (currentCount lt count) then do; 
        pagination.prev = {start=prevStart, limit=count, format=format, where=' ', table=table};
        if (prevStart ne 0) then do;
          pagination.first = {start=0, limit=count, format=format, where=' ', table=table};
        end; 
      return pagination;
      end;
      currentStart = from -1;
      if (currentStart eq 0) then do;
         pagination.next = {start=count, limit=count, format=format, where=' ', table=table};
         return pagination;
      end;

      nextStart = currentStart + count;
      pagination.next = {start=nextStart, limit=count, format=format, where=' ', table=table};
      pagination.prev = {start=prevStart, limit=count, format=format, where=' ', table=table};
      if (prevStart ne 0) then do;
        pagination.first = {start=0, limit=count, format=format, where=' ', table=table};
      end; 
      return pagination;
  end;




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