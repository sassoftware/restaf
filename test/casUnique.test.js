/* eslint-disable quotes */
const { setup, distinctValues, getTableColumns } = require('../lib/index.js');

const getToken = require('./getToken');

test('casUnique', async () => {
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
  let appControl = getAppControl();
  const preamble = `   
  action datastep.runcode /
  single='YES'
  code= "
     data casuser.testdatatemp;
     keep x1 x2 x3 id;
     length id varchar(20);
     do i = 1 to 35;
     x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
     output;
     end;
     ";
 `;
  appControl.preamble = null;
  const appEnv = await setup(payload, appControl);
  debugger;
  
  let values = await distinctValues(['make'], appEnv, {caslib: 'casuser', name: 'cars'}, `origin eq 'Europe'`);
  console.log(values);
  
  debugger;
  let table = {caslib: 'casuser', name: 'testtempdata'};
  
  let columns = await getTableColumns('cas',table, appEnv);
  /*
  console.log(JSON.stringify(results.results.casResults.ColumnInfo, null, 4));
  let columns = results.results.casResults.ColumnInfo.rows.map(r => r[0].toLowerCase());
  */
  console.log(columns);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'casuser', name: 'testdatatemp' },
    access: {},
    byvars: ['id'],

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