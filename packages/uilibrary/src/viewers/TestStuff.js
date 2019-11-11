import React from 'react';
// import {withRouter} from 'react-router-dom';
// import {AppContext} from '../../public/providers';
import "../css/styles.css";

function TestStuff (props) {
 //  const appContext = useContext(AppContext);
    debugger;
    console.log(props);
    let sdk = props.sdk;

    return (
      <div id="page-wrap">
        <sas-report url={sdk.url} reportUri={sdk.reportUri} authenticationType={sdk.credentials}
         className={sdk.class}></sas-report>
      </div>
    );
  }

// let TestStuff = withRouter(_TestStuff);
export default TestStuff;

