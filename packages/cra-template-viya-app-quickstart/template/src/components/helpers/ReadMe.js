/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
import React, {Fragment} from 'react';
const ReactMarkdown = require('react-markdown/with-html');

function ReadMe (props) {
  let { text } = props;
    
  return <Fragment>

    <ReactMarkdown escapeHtml={false} disallowedtypes={[ "inlinecode" ]}
           source={text}
        />;
  </Fragment>
}

export default  ReadMe;