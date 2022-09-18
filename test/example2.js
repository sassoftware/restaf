/* eslint-disable quotes */
const { setup, scrollTable, cellEdit, saveTable } = require('../lib/index.js');

runit()
  .then(r => console.log(r))
  .catch(err => console.log(err));

async function runit () {
  const viyaConnection = {
    host        : process.env.VIYA_SERVER,
    authType    : 'password',
    clientID    : 'sas.ec',
    clientSecret: '',
    user        : 'sastest1',
    password    : 'Go4thsas'
  };

  // For readability moved the appControl definition
  // to the end as a function
  // Also a good practice since it allows runtime creation of appControl
  const appControl = getAppControl();

  // setup edit session
  const appEnv = await setup(viyaConnection, appControl);

  // get the first set of records
  // data is available as appEnv.state.data
  // the column definitions are also available as appEnv.state.columns

  let result = await scrollTable('first', appEnv);
  console.log(result.status);
  console.log(appEnv.state.data);

  // Simulate an edit operation
  // The updated record is also updated on the cas inmemory table

  const x3New = result.data[0].x3 + 100;
  await cellEdit('x3', x3New, 0, result.data[0], appEnv);

  // Confirm it was written to the inmemory table
  // by refetching it
  result = await scrollTable('first', appEnv);
  console.log(appEnv.state.data);

  // Optionally persist the imemory table
  const status = await saveTable(appEnv);
  console.log(status);

  // Continue to scroll (next|prev|first) and do more editing
  result = await scrollTable('next', appEnv);
  // Do some more editing
  result = await scrollTable('prev', appEnv);
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'cas',
    table : { caslib: 'public', name: 'TESTDATA' },
    byvars: ['id'],

    initialFetch: {
      qs: {
        start : 0,
        limit : 1,
        format: false,
        where : 'x1 GT 5'
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
      handlers: { init, main, term, x1 },
      autoSave: true
    },
    appData: {} /* place holder for additional user data  */

  };
}
async function init (data, rowIndex, appEnv, type) {
  let status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  debugger;
  return [data, status];
};
async function main (data, rowIndex, appEnv, type) {
  let status = { statusCode: 0, msg: `${type} processing completed` };
  data.total = data.x1 + data.x2 + data.x3;
  debugger;
  return [data, status];
};

async function term (data, rowIndex, appEnv, type) {
  let status = { statusCode: 0, msg: `${type} processing completed` };
  console.log('In term');
  debugger;
  return [data, status];
};

async function x1 (data, name, rowIndex, appEnv) {
  let status = { statusCode: 0, msg: `${name} handler executed.` };
  if (data.x1 > 10) {
    status = { statusCode: 1, msg: `Value of X1 exceeded 10. Set to 10` };
    data.x1 = 10;
  }
  return [data, status];
};
