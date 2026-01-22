
let restaflib = require('@sassoftware/restaflib');
let restaf = require('@sassoftware/restaf');
let { casSetup, casUpload, casAppendTable } = restaflib;
let getLogonPayload = require('./getLogonPayload.js');
let fs = require('fs');

run()
	.catch(e => {
		console.error(e);
		process.exit(1);
	});
async function run() {
	let logonPayload = await getLogonPayload();
	let store = restaf.initStore(
		{
			casProxy: true,
			options: {
				proxyServer: null
			}
		});
	let msg = await store.logon(logonPayload);
	console.log(msg);
	let { session } = await casSetup(store, null);

	let altsrc = readFile('testdata', 'csv');
	let output = 'casuser.dtemp1';
	let r = await casUpload(
		store,
		session,
		null,
		output,
		true,
		altsrc
	);
	console.log(r);
	r = await casUpload(
		store,
		session,
		null,
		'casuser.testdata',
		true,
		altsrc
	);
	console.log(r);

	console.log('append to table');
	let [caslib, name] = output.split('.');
	let inputTable = { caslib: caslib, name: name };
	let outputTable = { caslib: 'casuser', name: 'testdata' };
	console.log(inputTable, '    ', outputTable);

	r = await casAppendTable(store, session, inputTable, outputTable, true)
	console.log(r);
	await store.apiCall(session.links('delete'));
	return 'done';
};

function readFile(filename, fileType) {
	let data = fs.readFileSync(`../../data/${filename}.${fileType}`, 'utf-8');
	console.log(data);
	return data;
}