/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { caslRun } from '@sassoftware/restaflib';
async function submitCasl(appEnv, src, args, useCommons) {

  let viyaSession = await appEnv.getViyaSession('cas');
  if (viyaSession == null) {
    return { status: { statusCode: 2, msg: 'Missing logon information' }, results: {} };
  }

  const { store, session } = viyaSession;

  try {
    try {
      let r = await caslRun(store, session, src, (args == null ? {} : args),
                            (useCommons === true ? true : false));
      let status = { statusCode: 0, msg: null };
      return { status, results: r };
    } catch (err) {
      console.log(err);
      return { status: { statusCode: 2, msg: 'See console for error messages' }, results: {}, err: err };
    }
  }
  catch (err) {
    console.log(err);
    return { status: { statusCode: 2, msg: 'See console for error messages' }, results: {}, err: err };
  }
}
export default submitCasl;