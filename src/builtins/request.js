/*
 * Copyright © 2024, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
async function request (appEnv, config) {
  let r = await appEnv.store.request(config);
  return r; 
}
export default request;