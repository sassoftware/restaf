/* eslint-disable quotes */
const { setup, distinctValues } = require('../lib/index.js');

test ('casUnique', async () => {
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
  debugger;
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
  appControl.preamble = preamble;
  const appEnv = await setup(payload, appControl);
  debugger;
  let values = await distinctValues('id', appEnv, appEnv.table);
  console.log(values);
  debugger;
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
