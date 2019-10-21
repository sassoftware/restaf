/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


module.exports = function scoreCasl (){
    let casl = `
    /*
        cas mycas;   
        proc cas;   
         
     
        _args_1 = {   
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
     
        _args_2 = {   
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
     
        _args_3 = {   
            path  = '/describe',  
            model = { caslib='modelstore', name='_LBP6S3ZAQGO614AJKDJT3AF93'}, 
            table = { caslib='', name=''},  
            scenario = { 
              sensor_ratio        =  4.3, 
              days_out_of_service =  5 
            } 
        };   
     
         
        _args_4 = {   
            path  = '/score',  
            model = { caslib='modelstore', name='_LBP6S3ZAQGO614AJKDJT3AF93'}, 
            table = { caslib='', name=''},  
            scenario = { 
              sensor_ratio        =  4.3, 
              days_out_of_service =  5 
            } 
        };   
     
     
        _args_5 = {   
            path = '/score',  
            modelName= 'Gradient_Boosting_3f3c7c89_13ac_469e_a761_28ee066e5b87' 
            model    = { caslib='casuser', name='testdest'}, 
            table = { caslib="", name=""},  
            scenario = { 
              sensor_ratio =  4.3, 
              days_out_of_service =  5 
            } 
        };   
     
     _args_6 = {   
            path = '/score',  
            modelName= 'Gradient_Boosting_7adb0404_85e3_474d_9d03_1059ef7ae008' 
            model    = { caslib='public', name='testpublish'}, 
            table = { caslib="", name=""},  
            scenario = { 
              sensor_ratio =  4.3, 
              days_out_of_service =  5 
            } 
        };   

        result = runMain(_args_1); 
        result = runMain(_args_2); 
        result = runMain(_args_3); 
        result = runMain(_args_4); 
        result = runMain(_args_5); 
    */ 
     
        result = runMain(_args_); 
        send_response(result); 
        /* print result; */
     
     
        function runMain(_args_) ; 
            r = {Error= 'No path'};   
            print _args_;   
            if ( _args_.path eq '/selectors') then do;   
                r = selectionLists(_args_.selectors, _args_.table.caslib, _args_.table.name);   
            end;   
            else if ( _args_.path eq '/contents') then do;  
                r = contents(_args_.table.caslib, _args_.table.name);  
            end;  
            else if (_args_.path eq '/describe') then do; 
               r = describeModel(_args_); 
            end; 
            else if (_args_.path eq '/scenario' ) then do;
              r = fetchData(_args_.filter, _args_.table);
            end;
            else if (_args_.path eq '/score') then do;  
                r =  runScoreCode(_args_.model,  _args_.scenario, _args_.modelName);   
            end;   
            else do; 
              r = {Errors = 'Invalid action option specified' || _args_.path}; 
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
     
        function describeModel(_args_) ; 
            s = checkAndLoadTable(_args_.model.caslib, _args_.model.name);   
            if ( s ne 0 ) then do;   
                results = {Errors= 'Unable to access ' ||_args_.model.caslib||'.'||_args_.model.name};   
                return results;   
                end; 
     
            mtype = isModel(_args_.model.caslib, _args_.model.name); 
            if ( mtype EQ 'astore' ) then do; 
               r = astoreDescribe(_args_.model); 
            end; 
            else if (mtype EQ 'ds' or mtype EQ 'ds2') then do;
               s = checkAndLoadTable(_args_.table.caslib, _args_.table.name);   
              if ( s ne 0 ) then do;   
                results = {Errors= 'Unable to access ' ||_args_.table.caslib||'.'||_args_.table.name};   
                return results;   
                end; 
               r = contents( _args_.table.caslib, _args_.table.name); 
            end; 
         return r; 
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
             
        
    `;
    return casl;
  }