const { setup, distinctValues, termApp } = require('../lib/index.js');
const getToken = require('./getToken');

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
  const appControl = getAppControl();
  ;
  console.log('appControl -------------------------------');
  console.log(appControl);
  console.log('------------------------------------------');
  debugger;
  const appEnv = await setup(payload, appControl);

  let values = await distinctValues(['make'], appEnv, {libref: 'SASHELP', name: 'CARS'}, '');

  console.log(values);
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'SASHELP', name: 'CARS' },
    byvars: ['key'],

    cachePolicy: true,

    initialFetch: {
      qs: {
        start : 0,
        limit : 5,
        format: true
      }
    },

    customColumns: {},

    editControl: {
      handlers: {} /* note reuse of init */
    },

    computeContext: null, /* optionaal - defaults to Job Execution Service */

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
