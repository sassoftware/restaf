
import { casUpdateData } from '@sassoftware/restaflib';
/**
 * @description Update the row on the server
 * @async
 * @module updateTableRows
 * @category restafedit/core
 * @param {rowObject} data  - data as a rowObject
 * @param {appEnv} appEnv   - app Environment object from setup
 * @returns {promise}       - key is completion code
 * @example
 *
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function updateTableRows (data, appEnv) {
  const { store, session } = appEnv;
  const { table, byvars } = appEnv.appControl.dataControl;
  const columns = appEnv.state.columns;

  if (byvars === null || byvars.length === 0) {
    return;
  }
  const t = {};
  for (const k in data) {
    if (k !== '_index_' && columns[k].custom === false) {
      t[k] = data[k];
    };
  };

  const w = {};
  byvars.forEach((k) => {
    w[k] = t[k];
  });
  const payload = {
    table,
    data : t,
    where: w
  };

  return await casUpdateData(store, session, payload);
}

export default updateTableRows;
