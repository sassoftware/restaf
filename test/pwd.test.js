/* eslint-disable quotes */

const { cli } = require('webpack');
const { setup, scrollTable, cellEdit,setWhere, termApp,saveTable, getTableColumns, getTableList } = require('../lib/index.js');

test('casBasic', async () => {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'password',
    user: 'sastest1',
    password: 'Go4thsas',
    clientID  : 'mcppw',
    clientSecret: 'mcppw'
   // options     : { casProxy: true, options: {}}
  };
  const r = await runit(payload);
  expect(r).toBe('done');
});

async function runit (payload) {
  const cache = [];
  const appControl = getAppControl();
  payload.storeOptions = {
    casProxy: false
  };
  debugger;
  const appEnv = await setup(payload, appControl);
  debugger;
  console.log(appEnv.builtins);
  console.log(appEnv.state.tableSummary);
  console.log(appEnv.casServerName);
  console.log(appEnv.state.data);
  //console.log(JSON.stringify(appEnv.store.getXsrfData(), null,4));
  debugger;
  let p = {
    qs: {
      start : 0,
      limit : 5,
      format: false,
      where : ' '
    }
  } 
  let r = await scrollTable('first', appEnv);
  console.log(JSON.stringify(appEnv.state.cache));
  console.log(r.data[0]);

  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'public', name: 'cars' },

    byvars: [],
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
      handlers: { initApp,init, main, term, termApp: termMyApp, x3 }, /* note reuse of init */
      autoSave: true,
      autoSaveTable: true
    },
    appData: {
      layout  : {},
      formName: 'testdata',

      uiControl: {
        defaultComponent: 'InputEntry',
        show            : ['id', 'total','arr', 'x2', 'x1', 'x3'],
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

  };
}

async function initApp (appEnv) {
  console.log('in initapp');
  console.log('userdata ',appEnv.userData);
  return { msg: 'done', statusCode: 0 };
}
async function termMyApp (appEnv) {
  console.log('in termApp');

  return { msg: 'done', statusCode: 0 };
}
async function init (data, rowIndex, appEnv, type) {
  debugger;
  console.log('in init....');
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  console.log(appEnv.userData);
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  return data;
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  return data
};

async function x3 (data, name, rowIndex, appEnv) {
  let x=data.x3/0;
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in x3');

  return [data, status];
};
async function arr (data, name, rowIndex, appEnv) {
  data.arr =[10,20,30];

  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in arr');

  return [data, status];
};
