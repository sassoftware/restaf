/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/
module.exports = function withAppContext () {
    let code = `
        import React from 'react';
        import AppContext   from './AppContext';
        function withAppContext(Component) {
            return function WrapperComponent(props) {
                return (
                    <AppContext.Consumer>
                        {state => <Component {...props} context={state} />}
                    </AppContext.Consumer>
                );
            };
        }
        export default withAppContext;
    `;
    return code;
}