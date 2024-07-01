/* eslint-disable quotes */
const { setup, scrollTable, cellEdit,setWhere, termApp,saveTable } = require('../lib/index.js');
const getToken = require('./getToken.js');
//console.log(getToken);

test('formBasic', async () => {
  const r = await runit();
  expect(r).toBe('done');
});

async function runit () {
  const payload = {
    host: 'http://localhost',
    authType: 'none'

  };
  
  
  const cache = [];
  const appControl = getAppControl();
  appControl.preamble = null;
  payload.storeOptions = {
    casProxy: false
  };
  debugger;
  const appEnv = await setup(payload, appControl);
  debugger;
  /*
  console.log(appEnv.builtins);
  console.log(appEnv.state.tableSummary);
  console.log(appEnv);
  */

  let r = await cellEdit('total',200, 0, appEnv.state.data[0], appEnv);
  console.log(r);
  console.log(appEnv.state.data[0]);
  await termApp(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',
    source: 'none',
    customColumns: {
      total: {
        Column         : 'Total',
        Label          : 'Grand Total',
        FormattedLength: 12,
        Type           : 'double'
      }
    },
    editControl: {
      handlers: { initApp, init, main, term, initApp, termApp: termMyApp, total }, 
      autoSave: true,
      autoSaveTable: true
    }
  };
}

async function initApp (appEnv) {
  console.log('in initApp');
  console.log('Table in initApp: ' ,appEnv.table);
  return { msg: 'done', statusCode: 0 };
}
async function termMyApp (appEnv) {
  console.log('in termApp');
  return { msg: 'done', satusCode: 0 };
}
async function init (data, rowIndex, appEnv, type) {
  console.log('in init');
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log(data)
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  return [data, status];
};

async function total (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log(data[name]);
  console.log('in total');
  return [data, status];
};
