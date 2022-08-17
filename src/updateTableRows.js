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
  const { table, byvars } = appEnv.appControl;
  const columns = appEnv.state.columns;

  if (byvars === null || byvars.length === 0) {
    return null;
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

  const result = await casUpdateData(store, session, payload);
  const r = result.items().toJS();
  const status = { statusCode: 0, msg: 'Save successful' };

  if (r.disposition.severity !== 'Normal') {
    status.statusCode = 2;
    status.msg = t.disposition.severity.reason;
  };
  return status;
}

async function iupdateComputeTable (data, appEnv) {
  const { store, session } = appEnv;
  const { table, byvars } = appEnv.appControl;
  const columns = appEnv.state.columns;
  ;

  if (byvars === null || byvars.length === 0) {
    return null;
  }

  let src =
    `proc sql; update ${table.libref}.${table.name}`;
  let set = 'SET ';
  let comma = ' ';
  for (const k in data) {
    if (columns[k].custom === false) {
      set = set + comma + k + '=' + value2String(data[k]);
    }
    comma = ', ';
  };
  src = src + ' ' + set;
  let w = ' WHERE ';
  let andBit = ' ';

  byvars.forEach((k) => {
    w = w + andBit + k + '=' + value2String(data[k]);
    andBit = 'AND ';
  });
  src = src + ' ' + w + ';run;';
  const asrc = src.split(/\r?\n/);

  const payload = {
    data: { code: asrc }
  };

  // console.log(asrc);

  const job = await store.apiCall(session.links('execute'), payload);
  const qs = {
    qs: {
      newState: 'Completed',
      timeout : 1
    }
  };

  // eslint-disable-next-line no-unused-vars
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
