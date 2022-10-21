const { setup, cellEdit, scrollTable, termApp } = require('../lib/index.js');

test ('computeFetchtmp', async () => {
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
  // eslint-disable-next-line quotes
  const preamble = `libname tempdata '/tmp';run; 
  data tempdata.testdata6;
  keep x1 x2 x3 id;
  length id $ 5;
  do i = 1 to 20;
  x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;
  debugger;
  appControl.preamble = preamble;
  const appEnv = await setup(payload, appControl);

  debugger;
  let result = await scrollTable('first', appEnv);
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
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempdata', name: 'testdata6' },
    byvars: ['id'],

    cachePolicy: true,

    initialFetch: { /* use rowSets query pattern */
      qs: { start: 0, limit: 1 }
    },

    customColumns: {
      total: {
        Column         : 'Total',
        Label          : 'Grand Total',
        FormattedLength: 12,
        Type           : 'FLOAT'
      }
    },
    editControl: {
      handlers: { init, main: init, term }, /* note reuse of init */
      save    : true,
      autoSave: true

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
