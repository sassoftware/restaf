/* eslint-disable quotes */
const { setup,  getLibraryList, updateValue, termApp, runControlLabel  } = require('../lib/index.js');
const getToken = require('./getToken.js');
//console.log(getToken);

test('v2formBasic', async () => {
  const r = await runit();
  expect(r).toBe('done');
});

async function runit () {
  const payload = {
    host: process.env.VIYA_SERVER,
    authType: 'server',
    token: getToken(),
    tokenType: 'bearer'

  };
  
  
  const cache = [];
  const appControl = getAppControl();
  appControl.preamble = null;
  payload.storeOptions = {
    casProxy: false
  };
  debugger;
  const appEnv = await setup(payload, appControl);
  let r = await appEnv.getViyaSession('cas');
  console.log('Viya Session:', r);
  let p = {
    qs: {
      limit: 1000,
      start: 0
    },
    where: {
      name: 'casuser'
    }
  }
  let l = await getLibraryList(appEnv);
  console.log(l);
  //console.log(appEnv);
  
  
  return 'done';
};

function getAppControl () {
  return {
    description: 'Simple Example',
    source: 'cas',
    apiVersion: 2 
    
  };
}

