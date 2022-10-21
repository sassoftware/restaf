/* eslint-disable quotes */
const { setup, scrollTable, cellEdit, termApp } = require('../lib/index.js');

test ('computeScroll', async () => {
  const r = await runit();
  expect(r).toBe('done');
  
});

async function runit () {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'password',
    clientID    : 'sas.ec',
    clientSecret: '',
    user        : 'sastest1',
    password    : 'Go4thsas',
    storeOptions: { casProxy: true }
  };
  const cache = [];
  const appControl = getAppControl();

  appControl.preamble = `libname tempdata '/tmp';run; 
    data tempdata.testdata9;
    keep x1 x2 x3 id;
    length id $ 5;
    do i = 1 to 20;
    x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;

  payload.storeOptions = {
    casProxy: false
  };
  const appEnv = await setup(payload, appControl);
  debugger;
  await scrollTable('first', appEnv);
  cache.push(appEnv.state.data[0]);
  console.log('xxxx ', appEnv.state.pagination);
  debugger;
  await scrollTable('next', appEnv);
  console.log(appEnv.state.pagination);
  debugger;
  await scrollTable('prev', appEnv);
  console.log(appEnv.state.pagination);

  const p = {
    qs: {
      start : 10,
      limit : 10,
      format: false
    }
  };
  await scrollTable('prev', appEnv, p);
  console.log(appEnv.state.pagination);

  await scrollTable('prev', appEnv);
  cache.push(appEnv.state.data[0]);

  const q = {
    qs: {
      start : 100,
      limit : 10,
      format: false,
      where : ''
    }
  };
  console.log('------------calling past the max');
  await scrollTable('prev', appEnv, q);
  debugger;
  console.log(' missing data ', appEnv.state.data);

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
        limit : 10,
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
