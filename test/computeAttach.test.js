const { setup, scrollTable, cellEdit, termApp } = require('../lib/index.js');

test ('computeAttach', async () => {
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

  debugger;

  // preamble - should be done in the context preamble
  // this arg is useful if you do not have a way to modify the context
  // eslint-disable-next-line quotes
  appControl.preamble = null;
  let x = `libname tempdata '/tmp';run; 
  data tempdata.testdata3;
  keep x1 x2 x3 id;
  length id $ 5;
  do i = 1 to 20;
  x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;

  let start = new Date();
  const appEnv1 = await setup(payload, appControl);
  console.log(appEnv1.sessionID, ' ', appEnv1.userSessionID);
  console.log( 'first setup....', new Date() - start);
  debugger;
  start = new Date();
  const appEnv2 = await setup(payload, appControl, appEnv1.sessionID);
  console.log(appEnv2.sessionID, ' ', appEnv2.session.items('id'));
  console.log( 'Second setup.....', new Date() - start);
  start = new Date();

  debugger;
  // eslint-disable-next-line prefer-const
  start = new Date();
  let result = await scrollTable('first', appEnv2);
  console.log('after fetch---------------', new Date() - start);
  
  debugger;
  console.log('result of first fetch -------------------------------');
  console.log(appEnv2.state.data);
  console.log(appEnv2.state.pagination);

  await termApp(appEnv2);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'SASHELP', name: 'AIR' },
    byvars: [' '],

    cachePolicy: true,

    initialFetch: {
      qs: {
        start : 0,
        limit : 1,
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
      handlers: { init, main: init, term }, /* note reuse of init */
      save    : true,
      autoSave: true
    },

    computeContext: null, /* optional - defaults to Job Execution Service */

    appData: {}

  };
}
async function init (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  return [data, status];
};
