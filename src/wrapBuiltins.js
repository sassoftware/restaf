  /*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
function wrapBuiltins(builtins, appEnv) { 
  const wrap = (appEnv, builtin) => async (...args) => {
  
    let r = await builtin(appEnv, ...args); 
    return r;
  };

  let wrappedBuiltins = {};
  for (let key in builtins) {
    if (key === 'restafedit' || key === 'restaflib') {
      wrappedBuiltins[key] = builtins[key];
    } else {
      wrappedBuiltins[key] = wrap(appEnv,builtins[key]);
    }
  }
  return wrappedBuiltins;
}
export default wrapBuiltins;