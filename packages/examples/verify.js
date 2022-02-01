let restaf = require('@sassoftware/restaf');
let configtest = require('./lib/configtest');

  runjob() 
  .then (r => console.log(r))
  .catch(e => console.log(e));

  async function runjob() {
      
    let store = restaf.initStore();
    let payload = configtest();
    let msg = await store.logon(payload);
    let s = await store.addServices('files', 'folders');
    let l = Object.keys(s);
    console.log(l);
  
    return 'done';
  }