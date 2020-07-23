/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function () {
    let code = `
        import React from 'react';
        import AppContext from './AppContext';

        class AppProvider extends React.Component {
            //  in case we want to set other globals
            constructor(props) {
                super(props);
                debugger;
                this.state = {
                    value: props.value
                }
            }
            render() {
                debugger;
                return (
                    <AppContext.Provider value={this.state.value}>
                    {this.props.children}
                    </AppContext.Provider>
                );
            }
        }
        export default AppProvider;
    
    `;
    return code;
}