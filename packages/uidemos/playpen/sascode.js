
/*
 * Copyright (c) SAS Institute Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *
 */

let sasCode= {
         code: [
             'ods html style=barrettsblue;',
             'data;',
                 'array x{10};',
                 'do j = 1 to 50;',
                     'do i = 1 to 10;',
                     'x{i} = i * 10;',
                     'end;',
                 'output;',
                 'put _ALL_;',
                 'end;',
             'run;',
             'proc print;run;',
             'ods html close;'
         ]
     };

let CASTEMPLATE = {
    action: '',
    data  : {}
};


/*
ods html style=barrettsblue;
 data;
     array x{10};  
     do j = 1 to 1000;  
     do i = 1 to 10;  
     x{i} = i * 10;  
     end;  
     output;  
     put _ALL_;  
     end;  
     run;  
     proc print;run;  
     ods html close;
    */
