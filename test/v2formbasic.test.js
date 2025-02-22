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
  console.log('After init', appEnv.state.data[0]);
  let r = await updateValue('number',undefined, appEnv);
  console.log('r',r)
  console.log(appEnv.state.data[0]);
  r = await updateValue('array', [1,2], appEnv);
  console.log(appEnv.state.data[0]);

  r = await updateValue('appValue',{number: -10000}, appEnv);
  console.log('after appValue', appEnv.state.data[0]);

  r = await runControlLabel('appSubmit', appEnv);
  console.log('from appSubmit', r);

  r = await runControlLabel('term', appEnv);
  console.log('r',r)

  r = await appEnv.getViyaSession('cas');
  console.log(r);
  r = await appEnv.deleteViyaSession('cas');
  console.log(r);
  await termApp(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',
    source: null,
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
      handlers: { initApp, init, main, term: termx, initApp, termApp: termMyApp, number, array,appValue, appSubmit}, 
      autoSave: true,
      autoSaveTable: true
    },
    
  };
}

async function appValue (value, data, _appContext) {
  console.log('in appValue');
  console.log(value);
  data.number = value.number;
  return { statusCode: 0, msg: `appValue processing completed` };
}

async function appSubmit (data, _appContext) {
 console.log('in appSubmit');
 return {x:1, y:2};
} 
async function initApp (_appContext) {
  console.log('in initApp');

  return { msg: 'done', statusCode: 0 };
}
async function termMyApp (_appContext) {
  console.log('in termApp');
  return { msg: 'done', satusCode: 0 };
}
async function init (data, _appContext) {
  console.log('in init');
  data.number = null;
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
  console.log('in number', data.number); 
  //return {statusCode: 2, msg: 'error'};
  
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