const { setup, cellEdit, scrollTable, termApp, getTableSummary } = require('../lib/index.js');
const { computeRun } = require('@sassoftware/restaflib');
const getToken = require('./getToken.js');
console.log(getToken);

test('computeBasic', async () => {
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
  
  const appControl = getAppControl();
  debugger;
  // eslint-disable-next-line quotes
  const preamble = `libname tempdata '/tmp';run; 
  data tempdata.testdata;
  array x(3) x1-x3;
  length id $ 5;
  do i = 1 to 20;
    do j = 1 to 3;
      x[j] = j*i;
    end;
  id=compress(TRIMN('key'||i));
  output;
end;
data tempdata.cars; set sashelp.cars;run;
run;`;
  debugger;
  appControl.preamble = preamble;
  debugger;
  const appEnv = await setup(payload, appControl);
  rc = await getTableSummary(appEnv);
  console.log(appEnv.state.tableSummary);
  console.log(appEnv.state.cache);

  debugger;
  let result = await scrollTable('first', appEnv);
  console.log('result of a initial fetchTableRows-----------------------------');
  debugger;
  console.log('initial record:' , appEnv.state.data[0]);
  /*
  console.log(appEnv.state.cache);

  console.log(appEnv.state.data[0]);
  console.log(JSON.stringify(appEnv.state.columns, null,4));
  console.log(appEnv.state.columns);
  console.log(appEnv.state.cache);
  */
  result = await scrollTable('first', appEnv);
  

  console.log('-------------------------------------------------------');
  const msrp = 50000;
  await cellEdit('msrp', msrp, 0, result.data[0], appEnv);
  debugger;
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');
  debugger;
  result = await scrollTable('first', appEnv);
  console.log('after reread');
  console.log(appEnv.state.data[0]);

  result = await scrollTable('next', appEnv);
  debugger;
  console.log('result of scroll next----------------------------------');
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');

  result = await scrollTable('next', appEnv);
  console.log('result of scroll prev wit modified data----------------');
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');
  
  result = await scrollTable('next', appEnv);
  debugger;
  console.log('result of scroll next----------------------------------');
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempdata', name: 'cars' },
    byvars: ['make', 'model', 'type'],

    cachePolicy: true,

    initialFetch: { /* use rowSets query pattern */
      qs: { start: 0, limit: 1, format: true, where: ' ', includeIndex: true}
    },

    customColumns: {
      total: {
        Column         : 'Total',
        Label          : 'Grand Total',
        FormattedLength: 12,
        Type           : 'FLOAT'
      }
    },
    editControl: {
      handlers: { init, main: init, term }, /* note reuse of init */
      save    : true,
      autoSave: true

    },
    appData: {
      layout  : {},
      formName: 'testdata',

      uiControl: {
        defaultComponent: 'InputEntry',
        show            : []
      }
    }

  };
}

async function initApp (appEnv) {
  const { store, session } = appEnv;
  debugger;
  const src = `libname tempdata '/tmp';run; 
    data tempdata.testdata;
    keep x1 x2 x3 id;
    length id $ 5;
    do i = 1 to 20;
    x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
    
    output;
    end;
    run;`;
  const r = await computeRun(store, session, src);
  if (r.SASJobStatus !== 'completed') {
    // eslint-disable-next-line no-throw-literal
    throw `initApp failed. Completion Code: ${r.SASJobStatus}`;
  }
  return { msg: 'fseinit completed', statusCode: 0 };
}

async function init (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('init:', data)
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  return [data, status];
};
