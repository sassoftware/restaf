/* eslint-disable quotes */
const { setup, getLibraryList, getTableList } = require('../lib/index.js');

runit()
  .then(r => console.log(r))
  .catch(err => console.log(JSON.stringify(err, null, 4)));

async function runit () {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'password',
    clientID    : 'sas.ec',
    clientSecret: '',
    user        : 'sastest1',
    password    : 'Go4thsas'
  };
  debugger;
  const appControl = getAppControl();
  const preamble = `   
   libname tempdata '/tmp';run; 
  data tempdata.testdatatemp;
  keep x1 x2 x3 id;
  length id $ 5;
  do i = 1 to 1000;
  x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
  
  output;
  end;
  run;`;
  appControl.preamble = preamble;
  const appEnv = await setup(payload, appControl);
  debugger;

  const libList = await getLibraryList(appEnv);
  debugger;
  console.log('--------------------', libList[0]);
  debugger;
  const tableList = await getTableList(libList[0], appEnv);
  console.log(tableList);
  debugger;
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'tempdata', name: 'testdatatemp' },
    access: {},
    byvars: ['pk'],

    cachePolicy: true,

    initialFetch: {
      qs: {
        limit : 10,
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
      handlers: { }, /* note reuse of init */
      save    : true,
      autoSave: true
    },
    appData: {}

  };
}
