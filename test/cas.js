/* eslint-disable quotes */
const { setup, scrollTable, cellEdit, termSession } = require('../dist/index.js');

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
  const cache = [];
  const appControl = getAppControl();
  const preamble = `   
  action datastep.runcode /
   code= 'data casuser.testdatatemp;set public.TESTDATA;run;';
  send_response({result= "done"});
  `;
  appControl.preamble = preamble;
  const appEnv = await setup(payload, appControl);
  debugger;
  await scrollTable('first', appEnv);
  cache.push(appEnv.state.data[0]);

  const x3New = appEnv.state.data[0].x3 + 100;
  await cellEdit('x3', x3New, 0, appEnv.state.data[0], appEnv);
  await scrollTable('first', appEnv);
  cache.push(appEnv.state.data[0]);

  debugger;
  await scrollTable('next', appEnv);
  cache.push(appEnv.state.data[0]);

  await scrollTable('prev', appEnv);
  cache.push(appEnv.state.data[0]);

  console.log(cache);
  await termSession(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'casuser', name: 'testdatatemp' },
    byvars: ['id'],

    initialFetch: {
      count : 2,
      from  : 1,
      format: false,
      where : 'x1 GT 5'
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
      handlers: { init, main, term, fseterm, x1 }, /* note reuse of init */
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

async function fseterm (appEnv) {
  console.log('in fseterm');
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
