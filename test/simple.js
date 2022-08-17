
const { setup, scrollTable, cellEdit, } = require('@sassoftware/restafedit');

  // Step 0: This example assumes password flow authentication
  const payload = {
    host        : 'Your viya server',
    authType    : 'password',
    clientID    : 'sas.ec',
    clientSecret: '',
    user        : 'me',
    password    : 'mypassword'
  };

  // Step 1: Read control information(see below)
  const appControl = getAppControl();

  // Step 2: Initialize and edit session
  const appEnv = await setup(payload, appControl);

  // Step 3: Read in rocords
  let result = await scrollTable('first', appEnv);

  // Step 4: Edit data(one more columns) and save on server
  const x1 = result.data[0].x1 + 1000;
  await cellEdit('x1', x1, 0, result.data[0], appEnv);
  
  // Step 5: Repeat step 3 and 4 as often as you want


function getAppControl () {
  return {
    description: 'Simple Example',

    source: 'compute',
    table : { libref: 'TEST', name: 'TESTDATA' },
    byvars: ['key'],

    cachePolicy: true,

    initialFetch: {
      count : 1,
      from  : 1,
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
      handlers: { init, main: init, term }, /* note reuse of init */
      save    : true,
      autoSave: true
    },

    computeContext: null, /* optional - defaults to Job Execution Service */

    appData: {}

  };
}
```

