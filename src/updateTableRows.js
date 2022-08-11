
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
  let result;
  if (appEnv.source === 'cas') {
    result = await iupdateCasTable(data, appEnv);
  } else {
    result = await iupdateComputeTable(data, appEnv);
  }
  return result;
}

async function iupdateCasTable (data, appEnv) {
  const { store, session } = appEnv;
  const { table, byvars } = appEnv.appControl.dataControl;
  const columns = appEnv.state.columns;
  const t = {};

  if (byvars === null || byvars.length === 0) {
    return null;
  }

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

async function iupdateComputeTable (data, appEnv) {
  const { store, session } = appEnv;
  const { table, byvars } = appEnv.appControl.dataControl;
  
  if (byvars === null || byvars.length === 0) {
    return null;
  }

  let src =
    `proc sql; update ${table.libref}.${table.name};`;
  let set = 'set ';
  let comma = ' ';
  for (const k in data) {
    set = set + comma + k + '=' + value2String(data[k]);
    comma = ', ';
  };

  let w = 'where  ';
  let andBit = ' ';

  byvars.forEach((k) => {
    w = w + andBit + k + '=' + value2String(data[k]);
    andBit = 'AND ';
  });
  src = src + ' ' + w + ';run;';
  const asrc = src.split(/\r?\n/);
  console.log(asrc);

  const payload = {
    data: { code: asrc }
  };

  const job = await store.apiCall(session.links('execute'), payload);
  const qs = {
    qs: {
      newState: 'Completed',
      timeout : 1
    }
  };

  const status = await store.jobState(job, qs);
  console.log(status.data);
  return true;
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
