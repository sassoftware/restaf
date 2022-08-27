/* eslint-disable quotes */
const { setup, uploadData } = require('../dist/index.js');

runit()
  .then((r) => console.log(r))
  .catch((err) => {
    console.log('error');
    console.log(JSON.stringify(err, null, 4));
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
  const aftersave = await uploadData({}, data, drop, addon, appEnv);

  console.log(aftersave.items().toJS());

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
      count : 1,
      from  : 10,
      format: false,
      where : ''
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
