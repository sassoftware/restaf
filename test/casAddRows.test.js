/* eslint-disable quotes */
const { setup, scrollTable, addRows, fetchRows, termApp } = require('../lib/index.js');
const getToken = require('./getToken');

test('addAddRows', async () => {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'server',
    token       : getToken(),
    tokenType   : 'bearer',
    storeOptions: { casProxy: true }
  };
  const r = await runit(payload);
  expect(r).toBe('done');
});
async function runit (payload) {
  const appControl = getAppControl();
  const preamble = `   
  action datastep.runcode /
  single='YES'
  code= "
     data casuser.testdatatemp;
     keep x1 x2 x3 id;
     length id varchar(20);
     do i = 1 to 5;
     x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
     output;
     end;
     ";
 `;
  appControl.preamble = preamble;
  payload.storeOptions = {
    casProxy: false
  };
  debugger;
  const appEnv = await setup(payload, appControl);

  await scrollTable('first', appEnv);
  const newRows = appEnv.state.data.map((r, i) => {
    r.id = 'keynew' + i.toString();
    r.x3 = r.x3 * 1000;
    return r;
  });
  debugger;
  const r = await addRows(newRows[0], appEnv, true);
  debugger;
  console.log(r);

  let p = {
    qs: {
      start : 0,
      limit : 10,
      format: false,
      where : 'x3 gt 1000'
    }
  };
  // eslint-disable-next-line no-unused-vars
  let result = await fetchRows(p, appEnv);
  console.log(JSON.stringify(appEnv.state.data));

  p = {
    qs: {
      start : 0,
      limit : 10,
      format: false,
      where : 'x3 ge 1000'
    }
  };
  debugger;
  // eslint-disable-next-line no-unused-vars
  result = await fetchRows(p, appEnv);
  console.log(JSON.stringify(appEnv.state.data));
  // console.log(cache);
  await termApp(appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'casuser', name: 'testdatatemp' },
    byvars: ['id'],

    initialFetch: {
      qs: {
        start : 0,
        limit : 10,
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
      handlers: { init, main, term, x1 }, /* note reuse of init */
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
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  const status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  return [data, status];
};

async function x1 (data, name, rowIndex, appEnv) {
  const status = { statusCode: 0, msg: `${name} handler executed.` };
  console.log('in x1');
  return [data, status];
};
