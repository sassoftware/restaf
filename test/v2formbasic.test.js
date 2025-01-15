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

  let r = await updateValue('number',200, appEnv);
  console.log('r',r)
  console.log(appEnv.state.data[0]);
  r = await updateValue('array', [1,2], appEnv);
  console.log(appEnv.state.data[0]);
  r = await runControlLabel('term', appEnv);
  console.log('r',r)
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
      handlers: { initApp, init, main, term: termx, initApp, termApp: termMyApp, number, array }, 
      autoSave: true,
      autoSaveTable: true
    },
    
  };
}

async function initApp (_appContext) {
  console.log('in initApp');
  console.log('Table in initApp: ' ,_appContext.table);
  return { msg: 'done', statusCode: 0 };
}
async function termMyApp (_appContext) {
  console.log('in termApp');
  return { msg: 'done', satusCode: 0 };
}
async function init (data, _appContext) {
  console.log(_appContext);
  console.log('in init');
  return { statusCode: 0, msg: `init processing completed` };
};
async function main (data, _appContext) {
  const status = { statusCode: 0, msg: `main processing completed` };
  return status
};

async function termx (data, _appContext) {
  const status = { statusCode: 0, msg: `term processing completed` };
  console.log('In term');
  return status
};

async function number (data,_appContext) {
  const status = { statusCode: 0, msg: `number handler executed.` };
  debugger;
  console.log('in number', _appContext.getViyaSession); 
  data.number = 2000;
  console.log('---------------in number');
};
async function array (data,_appContext) {
  const status = { statusCode: 0, msg: `array  handler executed.` };
  console.log('----in array');
  data.array = [20,30]; 
  console.log(data.array);
  console.log('in array');
};
async function obj1 (data, _appContext) {
  console.log('in obj1');
  const status = { statusCode: 0, msg: `obj1 handler executed.` };
  console.log(data.obj1);
  console.log('in obj1');

};