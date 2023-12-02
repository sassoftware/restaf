/* eslint-disable quotes */
const { setup, scrollTable, termApp } = require('../lib/index.js');
const getToken = require('./getToken.js');
test ('computeFetch', async () => {
  let payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'server',
    token       : getToken(),
    tokenType   : 'bearer',
    options     : { casProxy: true, options: {}},
  };
  const r = await runit(payload);
  expect(r).toBe('done');
});
  

async function runit (payload) {
 
  let cache = [];
  const appControl = getAppControl();

  appControl.preamble = `libname tempdata '/tmp';run; 
    data tempdata.testdata9;
    keep x1 x2 x3 id;
    length id $ 20;
    do i = 1 to 50;
    x1=i*20; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;

  payload.storeOptions = {
    casProxy: false
  };
  const appEnv = await setup(payload, appControl);
  debugger;
  await scrollTable('first', appEnv);
  cache = cache.concat(appEnv.state.data);
  do {
    await scrollTable('next', appEnv);
    cache = cache.concat(appEnv.state.data);
  //  cache.push(appEnv.state.data[0]);
  } while ( appEnv.state.scrollOptions.indexOf( 'next' ) !== -1 );
  console.log('--------------------------------------');
  cache.map((row,i) => {
    console.log('i=', i+1, JSON.stringify(row));
  });
  console.log('--------------------------------------');

  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempdata', name: 'testdata9' },
    byvars: ['id'],

    onNoData: 'keep',

    initialFetch: {
      qs: {
        start : 0,
        limit : 5,
        format: false,
        where : ' ',
        includeIndex: true
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
      handlers: { init, main, term, termApp: termMyApp, x1 }, /* note reuse of init */
      autoSave: true
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

  };
}

async function termMyApp (appEnv) {
  console.log('in termApp');
  return { msg: 'done', satusCode: 0 };
}
async function init (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  debugger;
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  debugger;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  debugger;
  return [data, status];
};

async function x1 (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in x1');
  return [data, status];
};
