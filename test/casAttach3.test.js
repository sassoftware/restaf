/* eslint-disable quotes */
const { setup, termApp } = require('../lib/index.js');
const getToken  = require('./getToken.js');
test ('casAttach', async () => {
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
  code= "
     data casuser.testdatatemp;
     keep x1 x2 x3 id;
     length id varchar(20);
     do i = 1 to 1000;
     x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
     output;
     end;
     ";
 `;
  appControl.preamble = null;

  payload.storeOptions = {
    casProxy: false
  };
  const appEnv1 = await setup(payload, appControl);
  console.log(appEnv1.sessionID);
  let lapp = await appEnv1.getViyaSession('compute');
  console.log(lapp.userSessionID);
  console.log(lapp.sessionID); 
  r = await appEnv1.deleteViyaSession('compute');


  lapp = await appEnv1.getViyaSession('compute');
  console.log(lapp.userSessionID);
  console.log(lapp.sessionID); 
  r = await appEnv1.deleteViyaSession('compute');
  console.log(r);
  lapp = await appEnv1.getViyaSession('compute');
  console.log(lapp.sessionID);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'none',
    table : null,
    byvars: ['id'],

    initialFetch: {
      qs: {
        limit : 1,
        start : 0,
        format: false
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
    preamble: null,
    editControl: {
      handlers: { init, main, term, termApp: termMyApp, x1 }, /* note reuse of init */
      autoSave: true
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
  debugger;
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  debugger;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  debugger;
  return [data, status];
};

async function x1 (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in x1');
  return [data, status];
};
