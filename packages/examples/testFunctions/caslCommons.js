/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

/*
 * Simple echo action example
 */
"use strict";

let { casSetup, caslRun} = require('@sassoftware/restaflib');

module.exports = async function caslCommons (testInfo) {
  let { store, logger } = testInfo;
  let { session } = await casSetup(store, null);
  logger.info(session.items().toJS());
  let _args_ = {
        input_caslib_name: 'Public',
        input_table_name : 'REVIEWS',
        
        mco_binary_caslib    : 'Analytics_Project_7df8f69b-5859-4d6b-af7d-63fcce76d511',
        mco_binary_table_name: '8ae856c674ae68150174b39bfd0a0000_CATEGORY_BINARY',
        
        output_caslib_name          : 'casuser',
        output_categories_table_name: 'out_category',
        
        output_matches_table_name       : 'out_matches',
        output_modeling_ready_table_name: 'out_modeling_ready',
        
        key_column     : 'id_review',
        document_column: 'Text_Review'
  };

  let src = `
    rc1 = checkAndLoadTable(_args_.input_caslib_name, _args_.input_table_name);
    print _args_.input_table_name  rc1;
    if ( rc1 ne TRUE ) then do;
      status = 'ERROR: ' || _args_.input_table.name || ' not found';
      exit({severity=2,reason=6, status={ERROR=status },statusCode=400});
    end;

    rc1 = checkAndLoadTable(_args_.mco_binary_caslib, _args_.mco_binary_table_name);
    print _args_.mco_binary_table_name rc1;
    if ( rc1 ne TRUE ) then do;
      status = 'ERROR: ' || _args_.mco_binary_table_name || ' not found';
      exit({severity=2,reason=6, status={ERROR=status },statusCode=400});
    end;

    send_response(_args_);
  `;

    let r = await caslRun(store, session, src, _args_, true);
    console.log(r);
  logger.info(r);
  await store.apiCall(session.links('delete'));
  return 'done';
};
