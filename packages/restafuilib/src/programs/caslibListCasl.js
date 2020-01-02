/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/

function caslibListCasl () {
  let code =  `
    action table.caslibInfo r=result/ 
        verbose=false;

    caslibList = {};
    i = 1;
    do row over result.caslibInfo;
        caslibList[i] = {value=row.name, label=row.name};
        i = i + 1;
    end;
    print caslibList;
    send_response({casResults=caslibList});

    `;
  return code;
}

export default caslibListCasl;