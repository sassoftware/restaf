/*
 * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";

let restaflib = require("@sassoftware/restaflib");
module.exports = async function casSession(testInfo) {
  let { store, logger } = testInfo;
  console.log("config", store.config);
  let { session } = await restaflib.casSetup(
    store,
    null,
    null,
    null
  );

  //console.log( session.links( 'execute' ).toJS() );
  //logger.info( session.items().toJS() );

  let p1 = {
    action: "datastep.runCode",
    data: {
      single: "YES",
      code: "data casuser.score; keep x1 x2;do i = 1 to 20; x1=i; x2=i*10;output;end;run; ",
    },
  };
  debugger;
  let r1 = await store.runAction(session, p1);
  console.log(r1.details().toJS());
  /*
  console.log(r1.items().toJS());
  console.log(r1.results().toJS());
  */

  console.log("---------------------------");
  /*
  let p = {
    action: "builtins.echo",
    data: {
      code: "data casuser.score; x1=10;x2=20;x3=30; score1 = x1+x2+x3;run; ",
    },
  };
  logger.info(p);

  let r = await store.runAction(session, p);
  console.log( JSON.stringify( session.links( "execute" ), null, 4 ) );
  console.log(r.items().toJS());
  */
  await store.apiCall(session.links("delete"));
  return "done";
};
