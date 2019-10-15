/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


module.exports = function scoreCasl (){
    let casl = `
    /*
        cas mycas;   
        proc cas;   
        _appEnv_1 = {   
            path  = '/describe',  
            model = { caslib='models', name='cms_sdoh_risk_stratification_cluster'},  
            table = { caslib= "public", name = "cluster_test2"}, 
            scenario = { 
              SDOH_Physically_Unhealthy_Days_=  4.3, 
              SDOH_Per_Adults_Bachelors      =  19.6, 
              SDOH_Unemployment_Rate         = 9.6, 
              SDOH_Median_Household_Income   = 45493 
            } 
      
        };   
     
        _appEnv_2 = {   
            path  = '/score',  
            model = { caslib='models', name='cms_sdoh_risk_stratification_cluster'},  
            table = { caslib= "public", name = "cluster_test2"}, 
            scenario = { 
              SDOH_Physically_Unhealthy_Days_ =  4.3, 
              SDOH_Per_Adults_Bachelors       =  19.6, 
              SDOH_Unemployment_Rate          = 9.6, 
              SDOH_Median_Household_Income    = 45493 
            } 
      
        };   
     
        _appEnv_3 = {   
            path  = '/describe',  
            model = { caslib='modelstore', name='_LBP6S3ZAQGO614AJKDJT3AF93'}, 
            table = { caslib='', name=''},  
            scenario = { 
              sensor_ratio        =  4.3, 
              days_out_of_service =  5 
            } 
        };   
     
         
        _appEnv_4 = {   
            path  = '/score',  
            model = { caslib='modelstore', name='_LBP6S3ZAQGO614AJKDJT3AF93'}, 
            table = { caslib='', name=''},  
            scenario = { 
              sensor_ratio        =  4.3, 
              days_out_of_service =  5 
            } 
        };   
     
     
        _appEnv_5 = {   
            path = '/score',  
            modelName= 'Gradient_Boosting_3f3c7c89_13ac_469e_a761_28ee066e5b87' 
            model    = { caslib='casuser', name='testdest'}, 
            table = { caslib="", name=""},  
            scenario = { 
              sensor_ratio =  4.3, 
              days_out_of_service =  5 
            } 
        };   
     
     _appEnv_6 = {   
            path = '/score',  
            modelName= 'Gradient_Boosting_7adb0404_85e3_474d_9d03_1059ef7ae008' 
            model    = { caslib='public', name='testpublish'}, 
            table = { caslib="", name=""},  
            scenario = { 
              sensor_ratio =  4.3, 
              days_out_of_service =  5 
            } 
        };   

        result = runMain(_appEnv_1); 
        result = runMain(_appEnv_2); 
        result = runMain(_appEnv_3); 
        result = runMain(_appEnv_4); 
        result = runMain(_appEnv_5); 
    */ 
     
        result = runMain(_appEnv_); 
        send_response(result); 
        /* print result; */
     
     
        function runMain(_appEnv_) ; 
            r = {Error= 'No path'};   
            print _appEnv_;   
            if ( _appEnv_.path eq '/selectors') then do;   
                r = selectionLists(_appEnv_.selectors, _appEnv_.table.caslib, _appEnv_.table.name);   
            end;   
            else if ( _appEnv_.path eq '/contents') then do;  
                r = contents(_appEnv_.table.caslib, _appEnv_.table.name);  
            end;  
            else if (_appEnv_.path eq '/describe') then do; 
               r = describeModel(_appEnv_); 
            end; 
            else if (_appEnv_.path eq '/scenario' ) then do;
              r = fetchData(_appenv_.filter, _appEnv_.table);
            end;
            else if (_appEnv_.path eq '/score') then do;  
                r =  runScoreCode(_appEnv_.model,  _appEnv_.scenario, _appEnv_.modelName);   
            end;   
            else do; 
              r = {Errors = 'Invalid action option specified' || _appEnv_.path}; 
            end; 
                 
            result = {casResults = r};  
            print '***************************************************************';  
            print result;  
            print '***************************************************************';  
            return result;  
        end; 
     
        /*-----------------------------------------*/ 
        /* describeModel                           */ 
        /*-----------------------------------------*/ 
     
        function describeModel(_appEnv_) ; 
            s = checkAndLoadTable(_appEnv_.model.caslib, _appEnv_.model.name);   
            if ( s ne 0 ) then do;   
                results = {Errors= 'Unable to access ' ||_appEnv.model.caslib||'.'||_appenv_.model.name};   
                return results;   
                end; 
     
            mtype = isModel(_appEnv_.model.caslib, _appEnv_.model.name); 
            if ( mtype EQ 'astore' ) then do; 
               r = astoreDescribe(_appEnv_.model); 
            end; 
            else if (mtype EQ 'ds' or mtype EQ 'ds2') then do;
               s = checkAndLoadTable(_appEnv_.table.caslib, _appEnv_.table.name);   
              if ( s ne 0 ) then do;   
                results = {Errors= 'Unable to access ' ||_appEnv_.table.caslib||'.'||_appEnv_.table.name};   
                return results;   
                end; 
               r = contents( _appEnv_.table.caslib, _appEnv_.table.name); 
            end; 
         return r; 
        end; 
     
        /*-----------------------------------------*/ 
        /* isModel: is it model table              */  
        /*-----------------------------------------*/  
     
        function isModel(caslib, name) ; 
             table.columnInfo r = result /  
                    table = {caslib=caslib , name=name};  
             validTable = false; 
             mtype = 'bad'; 
             do c over result.columninfo;  
                cu = upCase(c.Column); 
                if ( cu eq 'DATASTEPSRC') then do; 
                   mtype = 'ds'; 
                end; 
                else if ( cu eq '_STATE_' ) then do; 
                  mtype = 'astore'; 
                end; 
                else if (cu eq 'MODELMETADATA') then do; 
                  mtype = 'ds2'; 
                end; 
            end;  
            print 'Specified model type: ' || mtype; 
            return mtype; 
        end; 
     
        /*-----------------------------------------*/ 
        /* Returns contents of the specified table */  
        /*-----------------------------------------*/  
     
        function contents(caslib, name) ;    
            table.columnInfo r = result /  
                    table = {caslib=caslib , name=name};  
           /* columns ={{Column='_Index_',ID=0,Type='double',RawLength=5,FormattedLength=5,NFL=0,NFD=0}}; */ 
            i = 1;  
            columns = {}; 
            do c over result.columninfo;  
                columns[i] = c;  
                i = i + 1;  
            end;  
            return {describe = columns, table = {}};   
        end;  
             
        /*------------------------------------------*/  
        /* Returns unique values                   */  
        /*-----------------------------------------*/  
     
        function selectionLists(idvars,caslib, name);   
             
            s = checkAndLoadTable(caslib, name);   
            if ( s ne 0 ) then do;   
            results = {Errors= 'Unable to access ' ||caslib||'.'||name};   
            return results;   
            end;   
             
            do k over idvars;   
            r  = _getValues(k, caslib, name);   
            results[k] = r;   
            end;   
                 
            return results;       
        end;   
             
        function _getValues(id, caslib, name) ;   
                         
            action table.dropTable/   
            caslib='casuser' name='dtemp1' quiet=TRUE;   
                 
            action table.deleteSource status=src /   
            caslib='casuser' source= 'dtemp1.sashdat' quiet=TRUE;   
                 
            action simple.groupby result=r status=rc/   
                aggregator = 'N'   
                inputs     = {id}   
                table      = {caslib=caslib name=name}   
                casout     = {caslib='casuser' name='dtemp1'}   
            ;   
            action table.fetch result=r/   
                table={caslib='casuser' name='dtemp1'}    
                sortby={{name=id,  order='ascending'}};   
            result = r.Fetch[,2];   
            return result;   
            end;   
     
        /*------------------------------------------*/ 
        /* get a record                             */ 
        /*------------------------------------------*/ 
     
        function fetchData(filter, table); 
            s = checkAndLoadTable(table.caslib, table.name);   
            if ( s ne 0 ) then do;   
                results = {Errors= 'Unable to access ' ||table.caslib||'.'||table.name};   
                return results;   
                end;   
            wherex = dictTowhere(filter);   
           /* wherex = table.caslib||'.'||table.name||'(where=('||wherex||'));';  
             
            destroyTable('casuser', 'input');  
     
            action datastep.runCode r=result status=rc/   
                single='yes'   
                code = 'data casuser.input; set ' || wherex||'run;';  
                */ 
                 
            action table.fetch r = result /   
                table={caslib=table.caslib name=table.name where=wherex};   
         
            rows = resultsToDict(result.Fetch);   
            return {scenario = rows, table = result.Fetch};   
     
        end; 
       
        /*------------------------------------------*/ 
        /* astoreDescribe                           */ 
        /*------------------------------------------*/ 
     
        function astoreDescribe(model); 
          action astore.describe r=result/ 
              rstore = { caslib= model.caslib name = model.name }; 
          rows = resultsToDict(result.InputVariables); 
          return {describe = rows, table = result.InputVariables}; 
        end; 
     
        /*------------------------------------------*/  
        /* score                                    */  
        /*------------------------------------------*/  
        function runScoreCode( model, scenario, modelName);   
            print model; 
            s = checkAndLoadTable(model.caslib, model.name);   
            if ( s ne 0 ) then do;   
                results = {Errors= 'Unable to access ' ||model.caslib||'.'||model.name};   
                return results;   
                end;   
             
            mtype = isModel(model.caslib, model.name); 
     
            if ( mtype eq 'bad' ) then do; 
               results = {Error= model.caslib||'.'||model.name || ' is not recognized as a valid supported model. Please check your values'} ;  
               return results; 
                end; 
            destroyTable('casuser', 'input');   
            argsToTable(scenario, 'casuser', 'input'); 
     
            destroyTable('casuser', 'output');   
     
            if (mtype eq 'astore') then do; 
                print 'Scoring with astore'; 
                action astore.score r = result/   
                    rstore = {caslib=model.caslib name=model.name}   
                    out    = {caslib='casuser' name='output'}   
                    table  = {caslib='casuser' name='input'};   
            end; 
            else if (mtype eq 'ds') then do; 
                print 'scoring with datastep code'; 
                action datastep.runcodetable r = result/   
                    single='YES'   
                    codeTable= {caslib=model.caslib name=model.name}   
                    casout = {caslib='casuser' name='output'}   
                    table = {caslib='casuser' name='input'};   
            end;  
            else if (mtype eq 'ds2' ) then do; 
               print 'Scoring with d2'; 
               action ds2.runModel r = result/ 
                  modelTable = {caslib=model.caslib, name=model.name} 
                  modelName = modelName 
                  table = {caslib= 'casuser', name='input'} 
                  casOut = {caslib= 'casuser' name='output'}; 
               end; 
     
             
            action table.fetch r = result /   
                table={caslib='casuser' name='output'};   
             
            rows = resultsToDict(result.Fetch);   
            return rows;   
        end;   
             
             
        function destroyTable(caslib,name);   
            action table.dropTable/   
            caslib=caslib name=name quiet=TRUE;   
                     
            action table.deleteSource status=src /   
            caslib=caslib source= name||'.sashdat' quiet=TRUE;   
                 
        return true;   
        end;   
             
        function checkAndLoadTable(caslib, name);   
                         
            /*    
            * Verify that the table is loaded   
            */   
            action table.tableExists r=result/    
                caslib = caslib    
                name  = name;    
                 
            /*   
            * if necessary load the table   
            */   
             
            if ( result.exists eq 0) then do;   
             
                action table.loadTable status=status/    
                    caslib = caslib    
                    source = upcase(name) || '.sashdat'    
                    casout={caslib= caslib name=name};    
                return status.statusCode;   
            end;    
            else do;   
                print name '  preloaded';   
                return 0;   
            end;   
        end;   
             
        function dictToWhere(filter);   
            where ='';   
            andbit='  ';   
            do k,v over filter;   
                if (isString(v) ) then do;   
                    where = where || andbit || k ||  ' eq ' || '"'||v||'"';   
                end;    
                else do;   
                    where = where || andbit || k ||  ' eq ' || v ;   
                end;   
            andbit =' and ';   
            end;   
        return where;   
        end;   
             
        function resultsToDict(r);   
            casResults = {};   
            i = 1;   
            do row over r;   
            casResults[i] = row;   
            i = i + 1;   
            end;   
            return casResults;   
        end;   
         
        function argsToTable(_arg_, caslib, name );   
            action table.droptable/  
                caslib=caslib name=name quiet=TRUE;  
            i = 1;  
            do key,obj over _arg_;  
                columns[i] = key;  
                row[i] = obj;  
                if ( isString(obj) ) then  
                    type[i] = 'varchar';   
                else if ( isInteger(obj) ) then   
                    type[i] = 'int';   
                else type[i] = 'double';  
                i = i + 1;  
                end;    
             
            data1 = newTable('data1', columns, type, row );   
             
            saveresult data1 casout=name caslib=caslib replace;   
        end;   
     
    `;
    return casl;
  }