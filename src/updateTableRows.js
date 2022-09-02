import { casUpdateData } from '@sassoftware/restaflib';
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
  return payload;
}

async function _updateData (data, appEnv) {
  const { store, session } = appEnv;
  const handler = (appEnv.source === 'cas') ? casUpdateData : _computeUpdateData;
  const payload = makePayload(data, appEnv);
  const status = await handler(store, session, payload);
  return status;
}
// TBD: Move to restaflib

async function _computeUpdateData (store, session, payload) {
  debugger;
  const { data, table, where } = payload;
  let src =
    `proc sql; update ${table.libref}.${table.name}`;
  let set = 'SET ';
  let comma = ' ';
  for (const k in data) {
    set = set + comma + k + '=' + value2String(data[k]);
    comma = ', ';
  };
  src = src + ' ' + set;
  let swhere = ' WHERE ';
  let andbit = ' ';

  for (const k in where) {
    const v = where[k];
    swhere = swhere + andbit + k + `= ${value2String(v)} `;
    andbit = ' AND ';
  }
  src = src + ' ' + swhere + ';run;';
  const asrc = src.split(/\r?\n/);

  // TBD: switch to computeRun on next pass
  const p = {
    data: { code: asrc }
  };
  const job = await store.apiCall(session.links('execute'), p);
  const qs = {
    qs: {
      newState: 'Completed',
      timeout : 1
    }
  };
  const status = await store.jobState(job, qs);
  const c = (status.data === 'completed' ? 0 : 1);

  return { statusCode: c, msg: status.data };
}

function value2String (value) {
  let valueString;
  if (value == null) {
    valueString = '.';
  } else if (typeof value === 'string') {
    valueString = JSON.stringify(value);
  } else {
    valueString = value.toString();
  }
  return valueString;
}
export default updateTableRows;