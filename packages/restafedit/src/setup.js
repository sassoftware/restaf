
import { initStore } from '@sassoftware/restaf';
import { casSetup, lib }   from '@sassoftware/restaflib';

/**
 * @description Setup an Edit session
 * @async
 * @module setup
 * @param {logonPayload} logonPayload  - information for connecting to Viya
 * @param {appControl} appControl      - control information 
 * 
 * @returns {promise}  returns appEnv to control the flow 
 * @alias module: setup
 * @example
 *  const appEnv = await setup(logonPayload, appControl);
 *  
 */

async function setup (logonPayload, appControl) {
    let store = initStore();
    if (logonPayload.authType == null) {
        logonPayload.authType = 'code';
    }
    
    let r = await casSetup(store, logonPayload);
    let appEnv = {
        store       : store,
        session     : r.session,
        servers     : r.servers,
        restaflib   : lib,
        logonPayload: logonPayload,
        state       : {
            modified  : [],
            pagination: {},
            data      : {},
            columns   : {},
            recordKey : '',
        }
    };
    appEnv.appControl = appControl;
    appEnv.id       = Date(); /* just assign a new id - placeholder */
    return appEnv;
}
export default setup;