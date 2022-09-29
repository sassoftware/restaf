const { setup, scrollTable, cellEdit } = require('../lib/index.js');

runit()
  .then(r => console.log(r))
  .catch(err => {
    debugger;
    console.log('error', err);
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
  appControl.preamble = `libname tempdata '/tmp';run; 
  data tempdata.testdata;
  keep x1 x2 x3 id;
  length id $ 5;
  do i = 1 to 20;
  x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;

  const appEnv1 = await setup(payload, appControl);
  console.log(appEnv1.sessionID, ' ', appEnv1.userSessionID);

  const appEnv = await setup(payload, appControl, appEnv1.sessionID);
  console.log(appEnv.sessionID, ' ', appEnv.userSessionID);

  debugger;
  // eslint-disable-next-line prefer-const
  let result = await scrollTable('first', appEnv);
  debugger;
  console.log('result of first fetch -------------------------------');
  console.log(appEnv.state.data);
  console.log(appEnv.state.pagination);

  const x1 = result.data[0].x1 + 1000;
  await cellEdit('x1', x1, 0, result.data[0], appEnv);
  console.log('state values after edit--------------------------------');
  console.log(appEnv.state.data);
  console.log('-------------------------------------------------------');
  const p = {
    limit : 1,
    start : 0,
    format: false,
    where : 'x1 > 5000'
  };
  result = await scrollTable('first', appEnv, p);
  debugger;
  console.log('result of first fetch -------------------------------');
  console.log(appEnv.state.data);

  result = await scrollTable('prev', appEnv);
  console.log(result);
  console.log('result of scroll prev from top ----------------');
  console.log(appEnv.state.data);
  console.log('-------------------------------------------------------');

  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempData', name: 'TESTDATA' },
    byvars: ['key'],

    cachePolicy: true,

    initialFetch: {
      qs: {
        start : 0,
        limit : 1,
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
