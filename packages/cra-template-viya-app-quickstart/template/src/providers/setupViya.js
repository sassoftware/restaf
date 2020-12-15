import { initStore } from '@sassoftware/restaf/dist/restaf.js';
import { lib } from '@sassoftware/restaflib/dist/restaflib.js'
async function setupViya () {
	let store = initStore();
	await store.logon(window.appOptions.logonPayload);
	/* Commonly used services - can remove it and do it on demand as many times as needed*/
	// let {casManagement} = await store.addServices('casManagement', 'compute');
	// let servers = await store.apiCall(casManagement.links('servers'));

	let r = await fetch('./README.md');
	let text = await r.text();
	let appOptions = { ...window.appOptions };
	appOptions.README = text;
	let progressb     = progress.bind(null, store)
	let onCompletionb = onCompletion.bind(null,store);
	appOptions.jobStatus     = {progress: progressb, onCompletion: onCompletionb};
	appOptions.runAndReport  = runAndReport.bind(null,store)
	return { store: store, restaflib: lib, appOptions: appOptions };
}

function progress( store, data, jobContext ) {
	setJobStatus(store,null,jobContext,data, null);
	return false;
}
function onCompletion( store, err, status, jobContext ) {
	
	let state = (err == null) ? status.data : 'failed';
	setJobStatus(store,err, jobContext,state, status);
	return false;
}

function runAndReport(store, rafLink, p, jobContext) {
   setJobStatus(store, null, jobContext, 'started', null);
   store.apiCall(rafLink,p)
   .then( r => {
	     setJobStatus(store,null, jobContext, 'completed',r);
   })
   .catch (err => { 
	   setJobStatus(store,err, jobContext,'failed');
	})

}
async function setJobStatus(store,err, jobContext,state, status){
	let today = new Date();
	let time  = today.toISOString();
	let jobStatus = {
		log      : `Status: ${jobContext.id} ${state}`,
		timeStamp: time,
		state    : state,
		completed: (state === 'completed' || state === 'failed') ? true : false,
		jobContext: jobContext,
		status    : status,
		err       : err
	}

	store.setAppData('_jobStatus', jobStatus);
}

export default setupViya;
