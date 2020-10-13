/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
/*
usage: node myip your-machine-fullname(ex: d1111111111.us.acme.com)
*/

let dns = require('dns');
let os  = require('os');
let f   = process.argv[2];
console.log(`server name = ${f}`);

dns.resolve(f, (err, r) => {
    if (err)  {
        console.log(err);
    } else {
        console.log(`Your ip is: ${r}`);
    }
});