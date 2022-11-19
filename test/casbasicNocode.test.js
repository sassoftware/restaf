/* eslint-disable quotes */
const { setup, scrollTable, cellEdit, termApp } = require('../lib/index.js');

test('casNocode', async () => {
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
  const preamble = `   
  action datastep.runcode /
  single='YES'
  code= "
     data casuser.testdatatemp;
     keep x1 x2 x3 id;
     length id varchar(20);
     do i = 1 to 35;
     x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
     output;
     end;
     ";
 `;
  appControl.preamble = preamble;
  payload.storeOptions = {
    casProxy: false
  };
  const appEnv = await setup(payload, appControl);
  debugger;
  await scrollTable('first', appEnv);
  cache.push({row1: appEnv.state.data[0]});
  console.log(appEnv.state.columns.toString()); 
  console.log(appEnv.state.data.length);
  const x3New = appEnv.state.data[0].x3 + 100;
  console.log(appEnv.state.data.length);
  debugger;
  await cellEdit('x3', x3New, 0, appEnv.state.data[0], appEnv);
  console.log(appEnv.state.data[0]);

  debugger;
  await scrollTable('next', appEnv);
  cache.push({rownext: appEnv.state.data[0]});
  await scrollTable('first', appEnv);
  cache.push({row1again: appEnv.state.data[0]});
/*
  debugger;
  await scrollTable('next', appEnv);
  cache.push(appEnv.state.data[0]);
  debugger;
  let r = await scrollTable('prev', appEnv);
  console.log(appEnv.state.scrollOptions);
  console.log(r);

  debugger;
  r = await scrollTable('next', appEnv);
  console.log(appEnv.state.scrollOptions);
  debugger;
  */
  console.log(cache);
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'casuser', name: 'testdatatemp' },
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
      handlers: handlers, /* note reuse of init */
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
let handlers = {
  init: async (data) => data.total = data.x1 + data.x2 + data.x3,
  main: async (data) => data.total = data.x1 + data.x2 + data.x3,
  term: async (data) => data,
  x3: async (data) => 1000,
  termApp: termMyApp
}

