/* eslint-disable quotes */
const { setup, casTableUnique } = require('../dist/index.js');

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
  const appEnv = await setup(payload, getAppControl());
  debugger;
  const values = await casTableUnique('version', appEnv);
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
      count : 1,
      from  : 10,
      format: false
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