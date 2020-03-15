function SasReport(props) {
    debugger;
    let t = <sas-report url={props.url} reportUri={props.reportUri} authenticationType={props.authenticationType} style={props.style}> </sas-report>;
    ReactDOM.render(t, document.querySelector(props.element));
}