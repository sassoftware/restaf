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
  const appEnv = await setup(payload, getAppControl());
  debugger;
  let values = await distinctValues('version', appEnv);
  console.log(values);
  values = await distinctValues('company', appEnv, { caslib: 'public', name: 'customer_master' });
  console.log(values);
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
