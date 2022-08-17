const { setup, fetchTableRows, cellEdit, scrollTable } = require('../dist/index.js');

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
  // eslint-disable-next-line quotes
  const preamble = `libname tempdata '/tmp';run; 
  data tempdata.testdata;
  keep x1 x2 x3 id;
  do i = 1 to 100;
  x1=i; x2=3; x3=i*10; id=TRIMN('key'||i);
  
  output;
  end;
  run;`;
  debugger;
  const appEnv = await setup(payload, appControl, preamble);
  debugger;
  const control = {
    from  : 1,
    count : 1,
    format: false
  };
  debugger;
  let result = await fetchTableRows(control, appEnv);
  console.log('result of a fetchTableRows-----------------------------');
  debugger;
  console.log(appEnv.state.data[0]);

  console.log('-------------------------------------------------------');
  const x3New = result.data[0].x3 + 100;
  await cellEdit('x3', x3New, 0, result.data[0], appEnv);
  debugger;
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');
  debugger;
  result = await scrollTable('next', appEnv);
  debugger;
  console.log('result of scroll next----------------------------------');
  console.log(result.data[0]);
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');

  result = await scrollTable('prev', appEnv);
  console.log('result of scroll prev wit modified data----------------');
  console.log(result.data[0]);
  console.log(appEnv.state.data[0]);
  console.log('-------------------------------------------------------');

  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempdata', name: 'testdata' },
    byvars: ['id'],

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
      autoSave: false

    },
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
async function init (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  return [data, status];
};
