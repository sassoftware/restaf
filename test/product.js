/* eslint-disable quotes */
const { setup, scrollTable, termApp } = require('../lib/index.js');

runit()
  .then(r => console.log(r))
  .catch(err => console.log(err));

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
  code= "
     data casuser.testdatatemp;
     set public.PRODUCT_MASTER;
     run;
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
  console.log(appEnv.state.columns);
  console.log(appEnv.state.data);
  cache.push(appEnv.state.data[0]);

  debugger;
  await scrollTable('next', appEnv);
  cache.push(appEnv.state.data[0]);

  await scrollTable('prev', appEnv);
  cache.push(appEnv.state.data[0]);

  console.log(cache);
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'public', name: 'PRODUCT_MASTER' },
    byvars: ['pk'],

    initialFetch: {
      count : 0,
      from  : 50,
      format: false,
      where : ''
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
      handlers: {}, /* note reuse of init */
      autoSave: true
    },
    appData: {}
  };
}
