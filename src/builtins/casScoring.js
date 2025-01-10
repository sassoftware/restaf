/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import {caslScore} from '@sassoftware/restaflib';
async function casScoring(model, modelName, scenario) {
  let viyaSession = await appEnv.getViyaSession('cas');
  if (viyaSession == null) {
    return {status: {statusCode: 2, msg: 'Missing logon information'}, results: {}};
  }
  let {store, session} = viyaSession;
  try {
    let args = {
      model: model,
      modelName: modelName,
      scenario: scenario
    }
    let output = await caslScore(store, session, args);
    let status = { statusCode: 0, msg: null };
    let results = output.casResults;
    return {status, results, output: output};
  } catch (err) {
    console.log(err);
    return { status: { statusCode: 2, msg: 'See console for error messages' }, results: {}, output: null };  
  }
}
export default casScoring;