/*
 * Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// A quick implementation of doc viewer using ace

import React from 'react';
import { PropTypes } from 'prop-types';
import Container from '@material-ui/core/Container';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';


function WrapAceEditor (props) {
      
    let { currentDoc, mode, classes } = props;

    let show = (
        <Container>
            <main className={classes.maincontent}>
                <AceEditor
                    style={{width: "inherit"}}
                    mode={mode}
                    value={currentDoc.doc}
                    theme="github"
                    readOnly={true}/>
            </main>

        </Container>
    );
    return show;
}
WrapAceEditor.propTypes = {
    /** Information on current document */
    currentDoc: PropTypes.object.isRequired
};
export default WrapAceEditor;
