const { setup, uploadData, scrollTable } = require('../lib/index.js');

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
  length id $ 5;
  do i = 1 to 20;
  x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;
  debugger;
  appControl.preamble = preamble;
  const appEnv = await setup(payload, appControl);
  const r1 = await scrollTable('first', appEnv);
  console.log(r1.data);

  const t = { libref: 'tempdata', name: 'testdatanew' };
  debugger;
  const r = await uploadData(t, r1.data, ['total'], null, appEnv);
  console.log(r);
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
      from  : 5,
      format: false
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
