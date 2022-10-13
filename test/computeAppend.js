const { setup, scrollTable, appendRows, termApp } = require('../lib/index.js');

runit()
  .then(r => console.log(r))
  .catch(err => {
    debugger;
    console.log('error', err);
  });

async function runit () {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'password',
    clientID    : 'sas.ec',
    clientSecret: '',
    user        : 'sastest1',
    password    : 'Go4thsas'
  };
  const appControl = getAppControl();
  debugger;

  // preamble - should be done in the context preamble
  // this arg is useful if you do not have a way to modify the context
  // eslint-disable-next-line quotes
  appControl.preamble = `libname tempdata '/tmp';run; 
  data tempdata.testdatatemp;
  keep x1 x2 x3 id;
  length id $ 5;
  do i = 1 to 50;
  x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;
  data tempdata.tempmaster;
  keep x1 x2 x3 id;
  length id $ 5;
  do i = 1 to 10;
  x1=i*100; x2=5; x3=i*100; id=compress(TRIMN('keyxx'||i));
  output;
  end;
  run;
  `
  ;

  payload.storeOptions = {
    casProxy: false
  };
  const appEnv = await setup(payload, appControl);
  await scrollTable('first', appEnv);

  const r1 = await appendRows({ libref: 'tempdata', name: 'tempmaster' }, ['total'], appEnv);

  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempdata', name: 'testdatatemp' },
    byvars: ['id'],

    initialFetch: {
      qs: {
        start : 0,
        limit : 15,
        format: false,
        where : ''
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
