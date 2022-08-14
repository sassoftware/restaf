const { setup, fetchTableRows, scrollTable, cellEdit } = require('../dist/index.js');
const restafedit = require('../dist/index.js');
console.log(restafedit);

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
    password    : 'Go4thsas'
  };

  const appControl = getAppControl();
  ;
  console.log('appControl -------------------------------');
  console.log(appControl);
  console.log('------------------------------------------');

  const appEnv = await setup(payload, appControl);
  console.log(appEnv.appControl.dataControl);

  let result = await scrollTable('first', appEnv);
  console.log('result of first fetch -------------------------------');
  console.log(Object.keys(result));
  console.log(result);
  console.log('------------------------------------------');

  const x3New = result.data[0].x3 + 100;
  await cellEdit('x3', x3New, 0, result.data[0], appEnv);
  console.log('state values after edit--------------------------------');
  console.log(appEnv.state.data);
  console.log('-------------------------------------------------------');
  const x1New = 16;
  await cellEdit('x1', x1New, 0, result.data[0], appEnv);
  console.log('state values after edit--------------------------------');
  console.log(appEnv.state.data);
  console.log('-------------------------------------------------------');

  result = await scrollTable('next', appEnv);
  console.log('result of scroll next----------------------------------');
  console.log(result.data);
  console.log(result.pagination);
  console.log('-------------------------------------------------------');

  result = await scrollTable('prev', appEnv);
  console.log('result of scroll prev wit modified data----------------');
  console.log(result.data);
  console.log(result.pagination);
  console.log('-------------------------------------------------------');

  const control = {
    from  : 10,
    count : 5,
    format: false
  };
  result = await fetchTableRows(control, appEnv);
  console.log('result of a fetchTableRows-----------------------------');
  console.log(result.data);
  console.log(result.pagination);
  console.log('-------------------------------------------------------');

  console.log(appEnv.state.currentPage);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'casuser', name: 'testdata' },
    access: {},
    byvars: ['id'],
    where : {},

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
      handlers: { init, main: init, term, x1 }, /* note reuse of init */
      save    : true,
      autoSave: true
    },
    appData: {
      layout  : {},
      formName: 'testdata',

      uiControl: {
        defaultComponent: 'InputEntry',
        show            : ['id', 'total', 'x2', 'x1', 'x3'],
        visuals         : {
          x2: {
            component: 'Slider',
            props    : {
              min  : 0,
              max  : 50,
              steps: 1
            }
          },
          total: {
            props: {
              disabled: true
            }
          }
        }
      }

    }

  };
}
async function init (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  const newData = data; /* you can modify the incoming data and return it */
  return [newData, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  return [data, status];
};

async function x1 (data, name, rowIndex, appEnv) {
  let msg = { statusCode: 1, msg: `${name} handler executed.` };
  if (data.x1 > 10) {
    data.x1 = 10;
    msg = { statusCode: 2, msg: 'Exceeded Max. Value reset to max' };
  }

  return [data, msg];
};