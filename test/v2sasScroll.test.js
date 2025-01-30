/* eslint-disable quotes */
const { setup, scrollTable, termApp } = require('../lib/index.js');
const getToken = require('./getToken.js');
test('casScroll', async () => {
  const r = await runit();
  expect(r).toBe('done');

});

async function runit() {

  const payload = {
    host: process.env.VIYA_SERVER,
    authType: 'server',
    token: getToken(),
    tokenType: 'bearer'
  };

  let appControl = getAppControl();
  const preamble = null;

  appControl.preamble = preamble;
  payload.storeOptions = {
    casProxy: false
  };
  const appEnv = await setup(payload, appControl);
  debugger;
  await scrollTable('first', appEnv);
  console.log('pagination: ', appEnv.state.scrollOptions);

  while (appEnv.state.scrollOptions.includes('next')) {
    const r = await scrollTable('next', appEnv);
    console.log(appEnv.state.scrollOptions, appEnv.state.data.length);
  }
  do {
    const r = await scrollTable('prev', appEnv);
    console.log(appEnv.state.scrollOptions, appEnv.state.data.length);
  } while (appEnv.state.scrollOptions.includes('prev'));

  await termApp(appEnv);
  return 'done';
};

function getAppControl() {
  return {
    description: 'Simple Example',

    source: 'compute',
    table: { libref: 'SASHELP', name: 'AIR' },
    byvars: [],

    onNoData: 'noData',

    initialFetch: {
      qs: {
        start: 0,
        limit: 10,
        format: true,
        where: ' '
      }
    },
    customColumns: {},
      
    editControl: {
      handlers: { init, main, term, termApp: termMyApp }, /* note reuse of init */
      autoSave: true
    },
    appData: {}

  };
}

async function termMyApp(appEnv) {
  console.log('in termApp');
  return { msg: 'done', satusCode: 0 };
}
async function init(data, rowIndex, _appContext) {
  const status = { statusCode: 0, msg: `init processing completed` };
};
async function main(data, rowIndex, _appContext) {
  const status = { statusCode: 0, msg: `main processing completed` };
};

async function term(data, rowIndex, _appContext) {
  const status = { statusCode: 0, msg: `term processing completed` };
  console.log('In term');
};


