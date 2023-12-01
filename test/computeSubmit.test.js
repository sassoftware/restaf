const { setup, cellEdit, scrollTable, termApp, getTableSummary } = require('../lib/index.js');
const { computeRun } = require('@sassoftware/restaflib');
const getToken = require('./getToken.js');
console.log(getToken);

test('computeSubmit', async () => {
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
  const preamble = "libname tmp '/tmp';data tmp.cars; set sashelp.cars;run;"
  debugger;
  appControl.preamble = preamble;
  debugger;
  let appEnv;
  try {
    appEnv = await setup(payload, appControl);
  } catch (err) {
    console.log(err);
    return 'failed';
  }

  debugger;
  let result = await scrollTable('first', appEnv);
  console.log('result of a initial fetchTableRows-----------------------------');
  debugger;
  console.log('initial record:' , appEnv.state.data[0]);
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tmp', name: 'cars' },
    byvars: [],

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


async function init (data, rowIndex, appEnv, type) {
  debugger;
  let src = 'proc print data=sashelp.cars; run;';
 // let output = await appEnv.builtins.submit(src, {x:100},{log: true}, appEnv);
  debugger;
  //console.log(output.results.log);
  return data; 
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  return [data, status];
};
