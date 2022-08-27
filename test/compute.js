const { setup, scrollTable, cellEdit, fetchTableRows } = require('../dist/index.js');

runit()
  .then(r => console.log(r))
  .catch(err => {
    debugger;
    console.log('error', err);
  });

async function runit () {
  const payload = {
    host        : process.env.SSAWS,
    authType    : 'password',
    clientID    : 'sas.ec',
    clientSecret: '',
    user        : 'user04',
    password    : 'user04123'
  };

  const appControl = getAppControl();
  debugger;

  // preamble - should be done in the context preamble
  // this arg is useful if you do not have a way to modify the context
  // eslint-disable-next-line quotes
  const preamble = `libname test '/mnt/viya-share/data/deva';`;
  const appEnv = await setup(payload, appControl, preamble);

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

  result = await scrollTable('first', appEnv);
  debugger;
  console.log('result of first fetch -------------------------------');
  console.log(appEnv.state.data);

  result = await scrollTable('prev', appEnv);
  console.log(result);
  console.log('result of scroll prev from top ----------------');
  console.log(appEnv.state.data);
  console.log('-------------------------------------------------------');

  const control = {
    from  : 1,
    count : 5,
    format: false
  };
  result = await fetchTableRows(control, appEnv);
  console.log('result of a fetchTableRows-----------------------------');
  console.log(appEnv.state.data);

  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'TEST', name: 'TESTDATA' },
    byvars: ['key'],

    cachePolicy: true,

    initialFetch: {
      count : 1,
      from  : 1,
      format: false
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