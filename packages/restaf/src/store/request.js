/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright © 2023, SAS Institute Inc., Cary, NC, USA.  All Rights reserved *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

  'use strict';

import axios from 'axios';
let Https = null;
if (__IS_NODE__) {
  Https = require('node:https');
}

async function request ( store, payload, reducer ) {
  
    let config = {...payload};
  
    if ( payload.url.indexOf( 'https' ) !== -1  && Https !== null ) {
      let c = store.config;
      let opt = {};
      if ( c.httpOptions != null ) {
        opt = c.httpOptions;
      }
      let agent = new Https.Agent( opt );
      config.httpsAgent = agent;
    }
    let r = await axios( config );
    return ( reducer == null ) ? r : reducer( r );
}

export default request;