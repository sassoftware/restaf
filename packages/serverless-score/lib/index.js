/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


let casSetup = require('./src/casSetup');
let getLogonPayload = require('./src/getLogonPayload');
let getProgram = require('./src/getProgram');
let jsonToDict = require('./src/jsonToDict');
let parseEvent = require('./src/parseEvent');
let runCasl = require('./src/runCasl');
let scoreAsJson = require('./src/scoreAsJson');
let setError = require('./src/setError');
let setPayload = require('./src/setPayload');

module.exports = {
    casSetup,
    getLogonPayload,
    getProgram,
    jsonToDict,
    parseEvent,
    runCasl,
    scoreAsJson,
    setError,
    setPayload
}