/* eslint-disable quotes */
const { setup, uploadData } = require('../lib/index.js');

test ('casFail1', async () => {
  const r = await runit();
  expect(r).toBe('done');
  
});

async function runit () {
  const payload = {
    host    : process.env.VIYA_SERVER,
    authType: 'password',
    clientID: 'sas.ec',

    clientSecret: '',
    user        : 'sastest1',
    password    : 'Go4thsas'
  };
  debugger;
  const appEnv = await setup(payload, getAppControl());
  const data = [
    { a: 1, b: 'b1  ', c: 10, drop1: 1 },
    { a: 2, b: 'b2', c: 20, drop1: 2 }
  ];

  const addon = { company: 'sas', datetime: Date() };

  const drop = ['drop1'];
  debugger;
  // table, data, drop, addon, appEnv, masterTable, saveFlag
  const aftersave = await uploadData({ caslib: 'casuser', name: 'testedit' }, data, addon, drop, appEnv);

  console.log(aftersave);

  return 'done';
}

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
        Column: 'Total',
        Label : 'Grand Total',

        FormattedLength: 12,
        Type           : 'double'
      }
    },
    editControl: {
      handlers: {} /* note reuse of init */,
      save    : true,
      autoSave: true
    },
    appData: {}
  };
}
