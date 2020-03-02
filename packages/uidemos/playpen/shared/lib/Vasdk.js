function Vasdk(props) {
    debugger;
    let t = <sas-report url={props.url} reportUri={props.reportUri} authenticationType={props.authenticationType} className={props.class}> </sas-report>;
    ReactDOM.render(t, document.querySelector(props.element));
}