const { setup, distinctValues, termApp } = require('../lib/index.js');

const restafedit = require('../lib/index.js');
console.log(restafedit);


test ('computeUnique', async () => {
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
    password    : 'Go4thsas'
  };

  const appControl = getAppControl();
  ;
  console.log('appControl -------------------------------');
  console.log(appControl);
  console.log('------------------------------------------');
  debugger;
  const appEnv = await setup(payload, appControl);

  const values = await distinctValues('type', appEnv);
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
