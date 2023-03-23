/* eslint-disable quotes */
const { setup, scrollTable, cellEdit,setWhere, termApp,saveTable } = require('../lib/index.js');
const getToken = require('./getToken');
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
  appControl.preamble = preamble;
  payload.storeOptions = {
    casProxy: false
  };
  debugger;
  const appEnv = await setup(payload, appControl);
  debugger;
  console.log(appEnv.builtins);
  console.log(appEnv.state.tableSummary);
  console.log(appEnv.casServerName);
  debugger;
  let r = await scrollTable('first', appEnv);
  console.log(r.data[0]);
  
  cache.push({row1: appEnv.state.data[0]});
  const keepid= appEnv.state.data[0].id;
  console.log(appEnv.state.columns.toString()); 
  console.log(appEnv.state.data.length);
  const x3New = appEnv.state.data[0].x3 + 900;
  ;
  console.log(appEnv.state.data.length);
  await cellEdit('x3', x3New, 0, appEnv.state.data[0], appEnv);

  debugger;
  await scrollTable('next', appEnv);
  cache.push({rownext: appEnv.state.data[0]});
  await scrollTable('first', appEnv);
  cache.push({row1again: appEnv.state.data[0]});
  
  const where = "id = 'key1'";
  console.log(where)
  setWhere(where, appEnv);
  await scrollTable('first', appEnv);
  cache.push({where: appEnv.state.data[0]});

  // await saveTable(appEnv)
  console.log(cache);
  await termApp(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'casuser', name: 'TESTTEMPDATA' },
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
      handlers: { init, main, term, termApp: termMyApp, x3 }, /* note reuse of init */
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

  };
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
