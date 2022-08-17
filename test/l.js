const restaf = require('@sassoftware/restaf');

const store = restaf.initStore();

const payload = {
	host    : process.env.VIYA_SERVER,
	authType: 'password',
	clientID: 'sas.ec',

	clientSecret: '',
	user        : 'sastest1',
	password    : 'Go4thsas'
};

store.logon(payload)
  .then(r => console.log(r))
  .catch(err => console.log(err));