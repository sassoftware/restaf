/* eslint-disable quotes */
const { setup,  updateValue, termApp, runControlLabel  } = require('../lib/index.js');
const getToken = require('./getToken.js');
//console.log(getToken);

test('v2formBasic', async () => {
  const r = await runit();
  expect(r).toBe('done');
});

async function runit () {
  const payload = {
    host: null,
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

  r = await updateValue('array', 100, appEnv);
  console.log(r);
  console.log(appEnv.state.data[0]);
  r = await updateValue('object', 100, appEnv);
  console.log(r);
  console.log(appEnv.state.data[0]);
  r = await runControlLabel('term', appEnv);
  await termApp(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',
    source: 'none',
    apiVersion: 2,
    customColumns: {
      number: {
        Column         : 'Number',
        Label          : 'Grand Number',
        FormattedLength: 12,
        Type           : 'double',
        value: 0
      },
      string: {
        Column         : 'string',
        Label          : 'string',
        FormattedLength: 12,
        Type           : 'string',
        value:'aaa'
      },
      array: {
        Column         : 'array',
        Label          : 'Array',
        FormattedLength: 12,
        Type           : 'array',
        value: []
      },
      object: {
        Column         : 'object',
        Label          : 'Object',
        FormattedLength: 12,
        Type           : 'object',
        value: {}
      },
      boolean: {
        Column         : 'boolean',
        Label          : 'Boolean',
        FormattedLength: 12,
        Type           : 'boolean',
        value: true
      }
    },
    editControl: {
      handlers: { initApp, init, main, term: termx, initApp, termApp: termMyApp, number, array, object }, 
      autoSave: true,
      autoSaveTable: true
    },
    
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
async function init (data, appEnv) {
  console.log('in init');
  data.number = 1000;
  return { statusCode: 0, msg: `init processing completed` };
};
async function main (data, appEnv) {
  const status = { statusCode: 0, msg: `main processing completed` };
  return status
};

async function termx (data, appEnv) {
  const status = { statusCode: 0, msg: `term processing completed` };
  console.log('In term');
  return status
};

async function number (data,appEnv) {
  const status = { statusCode: 0, msg: `number handler executed.` };
  data.number = 2000;
  console.log('---------------in number');
  return {statusCode: 0, msg: 'done'};
};
async function array (data,appEnv) {
  const status = { statusCode: 0, msg: `array  handler executed.` };
  console.log('----in array');
  data.array = [20,30]; 
  console.log(data.array);
  console.log('in array');
};
async function object (data, appEnv) {
  console.log('in obj1');
  const status = { statusCode: 0, msg: `obj1 handler executed.` };
  console.log(data.obj1);
  console.log('in obj1');
  return [data, status];
};