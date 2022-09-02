import { casUpdateData, computeUpdateData } from '@sassoftware/restaflib';
/**
 * @description Update the row on the server
 * @async
 * @module updateTableRows
 * @category restafedit/core
 * @param {rowObject} data  - data as a rowObject or Array of rowObjects
 * @param {appEnv} appEnv   - app Environment object from setup
 * @returns {promise}       - {msg: string, statusCode: 0|1|2}
 * @example
 *
 * Please see the restafeditExample in the Tutorial pulldown
 */
async function updateTableRows (data, appEnv) {
  let result;
  const byvars = appEnv.appControl.byvars;
  if (byvars === null || byvars.length === 0) {
    return [null, { msg: 'Error: Please specify a by variable', statusCode: 1 }];
  }

  if (Array.isArray(data) === true) {
    for (let i = 0; i < data.length; i++) {
      result = await _updateData(data[i], appEnv);
    }
  } else {
    result = await _updateData(data, appEnv);
  }
  return result;
}

function makePayload (data, appEnv) {
  const { table, byvars } = appEnv.appControl;
  const columns = appEnv.state.columns;

  const t = {};
  for (const k in data) {
    if (!(k === '_index_' || k === '_rowIndex') && columns[k].custom === false) {
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
  console.log(JSON.stringify(payload, null, 4));
  return payload;
}

async function _updateData (data, appEnv) {
  const { store, session } = appEnv;
  const handler = (appEnv.source === 'cas') ? casUpdateData : computeUpdateData;
  const payload = makePayload(data, appEnv);
  console.log(JSON.stringify(payload, null, 4));
  console.log(payload);
  console.log(handler);
  const status = await handler(store, session, payload);
  console.log(status);
  return status;
}

export default updateTableRows;
