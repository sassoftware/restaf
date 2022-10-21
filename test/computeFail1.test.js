const { setup, scrollTable, cellEdit, termApp } = require('../lib/index.js');

test ('computeFail1', async () => {
  const r = await runit();
  expect(r).toBe('failed');
  
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

  // preamble - should be done in the context preamble
  // this arg is useful if you do not have a way to modify the context
  // eslint-disable-next-line quotes
  appControl.preamble = `libname tempdata '/tmp';run; 
  data tempdata.testdata4;zzzz
  keep x1 x2 x3 id;
  length id $ 5;
  do i = 1 to 20;
  x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;

  try {
    const appEnv = await setup(payload, appControl);
  } catch(err) {
    console.log('setup failed');
    await termApp(appEnv);
    return 'failed';
  }

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
    qs: {
      limit : 1,
      start : 0,
      format: false,
      where : 'x1 > 5000'
    }
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
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempData', name: 'TESTDATA4' },
    byvars: ['key'],

    cachePolicy: true,

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
