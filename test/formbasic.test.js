/* eslint-disable quotes */
const { setup,  cellEdit, termApp  } = require('../lib/index.js');
const getToken = require('./getToken.js');
//console.log(getToken);

test('formBasic', async () => {
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

  let r = await cellEdit('number',200, 0, appEnv.state.data[0], appEnv);
  console.log(appEnv.state.data[0]);
  r = await cellEdit('array', [1,2], 0, appEnv.state.data[0], appEnv);
  console.log(appEnv.state.data[0]);
  await termApp(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',
    source: 'none',
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
      handlers: { initApp, init, main, term, initApp, termApp: termMyApp, number, array }, 
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

async function number (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log(data[name]);
  data['foo'] = 'bar';
  data.array = 10;
  console.log('---------------in number');
  return [data, status];
};
async function array (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  data[name] = [20,30]; 
  console.log(data[name]);
  console.log('in array');
  return [data, status];
};
async function obj1 (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log(data[name]);
  console.log('in obj1');
  return [data, status];
};