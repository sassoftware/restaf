/* eslint-disable quotes */
const { setup, getLibraryList, getTableList } = require('../lib/index.js');
const getToken = require('./getToken');

test('casBasic', async () => {
  const payload = {
    host        : process.env.VIYA_SERVER,
    authType    : 'server',
    token       : getToken(),
    tokenType   : 'bearer',
    storeOptions: { casProxy: true }
  };
  console.log(payload);
  const r = await runit(payload);
  expect(r).toBe('done');
});

async function runit (payload) {
  debugger;
  const appControl = getAppControl();
  const preamble = `   
  action datastep.runcode /
  code= "
     data casuser.testdatatemp;
     keep x1 x2 x3 id;
     length id varchar(20);
     do i = 1 to 1000;
     x1=i; x2=3; x3=i*10; id=compress(TRIMN('key'||i));
     output;
     end;
     ";
 `;
  appControl.preamble = preamble;
  const appEnv = await setup(payload, getAppControl());
  debugger;

  const libList = await getLibraryList(appEnv);
  debugger;
  console.log('--------------------', libList[0]);
  debugger;
  const tableList = await getTableList(libList[0], appEnv);
  console.log(tableList);
  const tableList2 = await getTableList('Samples', appEnv);
  console.log(tableList2);
  debugger;
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'Public', name: 'product_master' },
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
