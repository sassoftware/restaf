/*
 * Copyright © 2021, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @description set a where clause for all subsequent fetches
 * @module setWhere
 * @category restafedit/fetch
 * @param {string} where  where expression(SAS Standard).Set to null to clear
 * @param {appEnv} appEnv   app Environment from setup
 * @returns {string} returns the current where
 * @example
 *  let oldwhere = setWhere('x>10', appEnv);
 *
 */

function setWhere (where, appEnv) {
  const c = appEnv.activeWhere;
  appEnv.activeWhere = (where == null) ? ' ' : where;
  return c;
};
export default setWhere;
