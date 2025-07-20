/* eslint-disable quotes */
const { setup, scrollTable, termApp } = require('../lib/index.js');

let getLogonPayload = require('./getLogonPayload.js');
test('casScroll', async () => {
  const r = await runit();
  expect(r).toBe('done');

});

async function runit() {

  let payload = await getLogonPayload();
  let appControl = {
    source: 'cas',
    table: { caslib: 'samples', name: 'costchange' },
    /*
    byvars: [''],
    initialFetch: {
      qs: {
        start : 0,
        limit : 10,
        format: false,
        where : ' '
      }
    },
    customColumns: {},
    editControl: {}
    */
  };
  const preamble = `   
  action datastep.runcode /
  single='YES'
  code= "
     data casuser.testdatatemp;
     keep x1 x2 x3 id;
     length id varchar(20);
     do i = 1 to 50;
     x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
     output;
     end;
     ";
 `;
  appControl.preamble = preamble;
  payload.storeOptions = {
    casProxy: false
  };
  const appEnv = await setup(payload, appControl);
  debugger;
  await scrollTable('first', appEnv);
  console.log('pagination: ', appEnv.state.scrollOptions);

  while (appEnv.state.scrollOptions.includes('next')) {
    const r = await scrollTable('next', appEnv);
    console.log(appEnv.state.scrollOptions, appEnv.state.data.length);
  }
  do {
    const r = await scrollTable('prev', appEnv);
    console.log(appEnv.state.scrollOptions, appEnv.state.data.length);
  } while (appEnv.state.scrollOptions.includes('prev'));

  await termApp(appEnv);
  return 'done';
};

function getAppControl() {
  return {
    description: 'Simple Example',

    source: 'cas',
    table: { caslib: 'samples', name: 'costchange' },
    byvars: ['id'],

    onNoData: 'noData',

    initialFetch: {
      qs: {
        start: 0,
        limit: 10,
        format: true,
        where: ' '
      }
    },
    customColumns: {
      total: {
        Column: 'Total',
        Label: 'Grand Total',
        FormattedLength: 12,
        Type: 'double'
      }
    },
    editControl: {
      handlers: { init, main, term, termApp: termMyApp, x1 }, /* note reuse of init */
      autoSave: true
    },
    appData: {
      layout: {},
      formName: 'testdata',

      uiControl: {
        defaultComponent: 'InputEntry',
        show: ['id', 'total', 'x2', 'x1', 'x3'],
        visuals: {
          x2: {
            component: 'Slider',
            props: {
              min: 0,
              max: 50,
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

async function termMyApp(appEnv) {
  console.log('in termApp');
  return { msg: 'done', satusCode: 0 };
}
async function init(data, rowIndex, _appContext) {
  const status = { statusCode: 0, msg: `init processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
};
async function main(data, rowIndex, _appContext) {
  const status = { statusCode: 0, msg: `main processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
};

async function term(data, rowIndex, _appContext) {
  const status = { statusCode: 0, msg: `term processing completed` };
  console.log('In term');
};

async function x1(data,  rowIndex, _appContext) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in x1')
};
