/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


let getLogonPayload = require('./src/getLogonPayload');
let parseEvent = require('./src/parseEvent');
let setError = require('./src/setError');
let setPayload = require('./src/setPayload');

module.exports = {
    getLogonPayload,
    parseEvent,
    setError,
    setPayload
}