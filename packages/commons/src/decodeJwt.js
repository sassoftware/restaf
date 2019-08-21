/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict';

const jwtDecode = require('jwt-decode');
function decodeJwt (token){
    return  token === null ? {} : jwtDecode(token);
}
export default decodeJwt;