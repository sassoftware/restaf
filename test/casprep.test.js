/* eslint-disable quotes */
const { setup, scrollTable, cellEdit,setWhere, prepFormData, termApp,saveTable } = require('../lib/index.js');
const getToken = require('./getToken.js');
console.log(getToken);

test('casBasic', async () => {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'server',
    token       : getToken(),
    tokenType   : 'bearer',
    storeOptions: { casProxy: true }
  };
  const r = await runit(payload);
  expect(r).toBe('done');
});

async function runit (payload) {
  const cache = [];
  const appControl = getAppControl();
  const preamble = `   
  action datastep.runcode /
  single='YES'
  code= "
     data casuser.TESTTEMPDATA;
     keep x1 x2 x3 id;
     length id $5.;
     do i = 1 to 35;
     x1=i; x2=3; x3=i*10; id=strip(compress(TRIMN('key'||i)));
  
     output;
     end;
     ";
 `;
  appControl.preamble = null;
  payload.storeOptions = {
    casProxy: false
  };
  debugger;
  const appEnv = await setup(payload, appControl);
  console.log(JSON.stringify(appEnv.state, null,4));
  console.log(JSON.stringify(appEnv.appControl.customColumns, null,4));
  let r = {schema: [], rows: []};
  const result = await prepFormData(r, appEnv, true);
  console.log('result');
  console.log(result)
  await termApp(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : null,
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
      },
      x: {
        Column         : 'X',
        Label          : 'Input',
        FormattedLength: 12,
        Type           : 'double'
      }
    },
    editControl: {
      handlers: { init, main, term, termApp: termMyApp }, /* note reuse of init */
      autoSave: true,
      autoSaveTable: true
    },
    appData: {
      layout  : {},
      formName: 'testdata',

      uiControl: {
        defaultComponent: 'InputEntry',
        show            : [],
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
  data.total = data.x *100;
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x *100;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  return [data, status];
};

async function x (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in x');
  return [data, status];
};
