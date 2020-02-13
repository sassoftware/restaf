import {useState, useEffect, useRef} from 'react';

function TestStuff (props) {
    debugger;
    let [ sdk, setSdk ] = useState(props.sdk);
    let lastUri = useRef(null);

    // save current uri
    useEffect(() => {
      debugger;
      lastUri.current = props.reportUri;
    });

    // Run if reportUri changes
    useEffect(() => {
      debugger;
      if (lastUri.current !== props.current) {
        setSdk(props.setSdk);
      }
    }, [ props.reportUri ]);

    let show = <div>
                <pre> {JSON.stringify(props, null,4)} </pre>
               <div id="page-wrap">
                   <sas-report url={sdk.url} reportUri={sdk.reportUri} authenticationType={sdk.credentials}
                style={sdk.style}></sas-report>></div>
                </div>;
    return show;
  }

export default TestStuff;

