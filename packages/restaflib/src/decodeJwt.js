/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

import jwtDecode from 'jwt-decode';
function decodeJwt (token){
    let jwt = jwtDecode(token);
    return jwt;
}
export default decodeJwt;