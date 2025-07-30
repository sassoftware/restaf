/* eslint-disable quotes */

const { setup, scrollTable, cellEdit,setWhere, termApp,saveTable, getTableColumns, getTableList } = require('../lib/index.js');
const getLogonPayload = require('./getLogonPayload.js');

  
  runit()  
  .then((result) => {
    console.log('Test completed successfully:', result);
  }
  ).catch((error) => {
    console.error('Test failed:', error);
  debugger;
  });

async function runit () {
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
  let payload = await getLogonPayload();
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
  
  cache.push({row1: appEnv.state.data[0]});
  const keepid= appEnv.state.data[0].id;
  console.log(appEnv.state.columns.toString()); 
  console.log(appEnv.state.data.length);
  const x3New = appEnv.state.data[0].x3 + 900;
  console.log(appEnv.state.data.length);
  debugger;
  r = await cellEdit('x3', x3New, 0, appEnv.state.data[0], appEnv);
  console.log('x3 cell edit done');
  console.log(r.status);
  console.log( console.log(r.data[0]));
  debugger;
  await scrollTable('next', appEnv);
  cache.push({rownext: appEnv.state.data[0]});
  await scrollTable('first', appEnv);
  cache.push({row1again: appEnv.state.data[0]});
  
  try {
    let r = await saveTable(appEnv);
    console.log(r);
 } catch (e) {
   console.log(e);
 }
  const where = "id = 'key1'";
  console.log(where)
  setWhere(where, appEnv);
  await scrollTable('first', appEnv);
  console.log(getTableColumns)
  console.log(appEnv.table);
  let columns = await getTableColumns('cas', appEnv.table, appEnv);
  console.log(columns);
  cache.push({where: appEnv.state.data[0]});

  console.log(cache);

  let tx = await getTableList('Samples', appEnv, p);
  console.log(tx);
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
