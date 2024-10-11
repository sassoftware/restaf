/* eslint-disable quotes */
const { setup, scrollTable, cellEdit,setWhere, termApp,saveTable } = require('../lib/index.js');
const getToken = require('./getToken');
console.log(getToken);

test('No Data', async () => {
  console.log(getToken);
  const r = await runit();
  expect(r).toBe('done');
});

async function runit () {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'server',
    token       : getToken(),
    tokenType   : 'bearer'
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
  console.log(appEnv.builtins);
  console.log(appEnv.state.tableSummary);
  console.log(appEnv);
  await termApp(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : null,
    /* 
    byvars: ['id'],

    initialFetch: {
      qs: {
        start : 0,
        limit : 20,
        format: false,
        where : ' '
      }
    },
    customColumns: {
      total: {
        Column         : 'Total',
        Label          : 'Grand Total',
        FormattedLength: 12,
        Type           : 'double'
      }
    },
    editControl: {
      handlers: { init, main, term, initApp, termApp: termMyApp, x3 }, 
      autoSave: true,
      autoSaveTable: true
    },
    appData: {
      layout  : {},
      formName: 'testdata',

      uiControl: {
        defaultComponent: 'InputEntry',
        show            : ['id', 'total', 'x2', 'x1', 'x3'],
        visuals         : {
          x2: {
            component: 'Slider',
            props    : {
              min  : 0,
              max  : 50,
              steps: 1
            }
          },
          total: {
            props: {
              disabled: true
            }
          }
        }
      }
    
    
    }
    */

  };
}

async function initApp (appEnv) {
  console.log('in initApp');
  console.log('Table in initApp: ' ,appEnv.table);
  return { msg: 'done', satusCode: 0 };
}
async function termMyApp (appEnv) {
  console.log('in termApp');
  return { msg: 'done', satusCode: 0 };
}
async function init (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  return [data, status];
};

async function x3 (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in x3');
  return [data, status];
};
