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
       keep x1 x2 x3 id;
       /*length id $;*/
       length id varchar(50);
       do i = 1 to 1000;
       x1=i; x2=3; x3=i*10; id='longstring'||compress(TRIMN('key'||i));
       output;
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

  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'casuser', name: 'testdatatemp' },
    byvars: ['id'],

    initialFetch: {
      qs: {
        start : 0,
        limit : 50,
        format: false,
        where : ''
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
      handlers: {}, /* note reuse of init */
      autoSave: true
    },
    appData: {}
  };
}
