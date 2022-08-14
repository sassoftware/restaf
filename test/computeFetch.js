const { setup, fetchTableRows, scrollTable } = require('../dist/index.js');

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
  // eslint-disable-next-line quotes
  const preamble = `libname test '/mnt/viya-share/data/deva';run;proc print data=test.testdata;run;`;
  const appEnv = await setup(payload, appControl, preamble);

  const control = {
    from  : 10,
    count : 10,
    format: false
  };
  debugger;
  await fetchTableRows(control, appEnv);
  console.log('result of a fetchTableRows-----------------------------');
  console.log(appEnv.state.data);

  console.log('-------------------------------------------------------');

  let result = await scrollTable('next', appEnv);
  console.log('result of scroll next----------------------------------');
  console.log(result.data);
  console.log(result.pagination);
  console.log('-------------------------------------------------------');

  result = await scrollTable('prev', appEnv);
  console.log('result of scroll prev wit modified data----------------');
  console.log(result.data);
  console.log(result.pagination);
  console.log('-------------------------------------------------------');

  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',
    dataControl: {
      source: 'compute',
      table : { libref: 'TEST', name: 'testdata' },
      access: {},
      byvars: ['date'],
      where : {},

      cachePolicy: true,

      initialFetch: {
        count : 5,
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
      customRows: []
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
  data.total = data.air * 10;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  return [data, status];
};
