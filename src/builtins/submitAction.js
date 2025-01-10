/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import { casActionRun } from "@sassoftware/restaflib";
async function submitAction(appEnv, action, args) {
  let viyaSession = appEnv.getViyaSession("cas");
  if (viyaSession == null) {
    return { status: { statusCode: 2, msg: "Missing logon information" }, results: {} };
  }
  let {store, session} = viyaSession;
  let p = {
    action: action,
    data: args
  };
  try {
    let r = await casActionRun(store, session, p);
    return { status: { statusCode: 0, msg: null }, results: r };
  } catch (err) {
    return { status: { statusCode: 2, msg: err }, results: {} };
  }
}
export default submitAction;