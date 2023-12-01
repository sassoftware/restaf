const { setup, cellEdit, scrollTable, termApp, getTableSummary } = require('../lib/index.js');
const { computeRun } = require('@sassoftware/restaflib');
const getToken = require('./getToken.js');
console.log(getToken);

test('computeRead', async () => {
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
  const preamble = 'libname tmp "/tmp";data tmp.cars; set sashelp.cars;run;';
  debugger;
  appControl.preamble = preamble;
  debugger;
  const appEnv = await setup(payload, appControl);
  rc = await getTableSummary(appEnv);
  console.log(appEnv.state.tableSummary);
  console.log(appEnv.state.cache);

  debugger;
  let result = await scrollTable('first', appEnv);
  console.log('result of a fetchTableRows-----------------------------');
  debugger;
  //console.log(appEnv.state.cache);
  console.log(appEnv.state.data[0]);
  console.log(JSON.stringify(appEnv.state.columns, null,4));
  console.log(appEnv.state.columns);
  // console.log(appEnv.state.cache);
  
  /*
  console.log('-------------------------------------------------------');
  const x3New = result.data[0].x3 + 100;
  await cellEdit('x3', x3New, 0, result.data[0], appEnv);
  debugger;
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');
  debugger;
  result = await scrollTable('next', appEnv);
  debugger;
  console.log('result of scroll next----------------------------------');
  console.log(result.data[0]);
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');

  result = await scrollTable('prev', appEnv);
  console.log('result of scroll prev wit modified data----------------');
  console.log(result.data[0]);
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');
  */
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tmp', name: 'cars' },
    byvars: ['id'],

    cachePolicy: true,

    initialFetch: { /* use rowSets query pattern */
      qs: { start: 0, limit: 1, format: false, where: ' '}
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
      handlers: { initApp, init, main: init, term }, /* note reuse of init */
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
  return { msg: 'initapp completed', statusCode: 0 };
}

async function init (data, rowIndex, appEnv, type) {
  console.log(data);
  return data;
};

async function term (data, rowIndex, appEnv, type) {
  return data;
};
