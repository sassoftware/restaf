import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function VasdkInReact (props) {
    debugger;
    let {host, style, credentials } = useState(props);
    let [ reportsList, setReportList ] = useState(null);
    let [ currentReport, setCurrentReport ] = useState(null);
    
  let lastReportList = useRef(null);

    // save current uri
    useEffect(() => {
      debugger;
      lastReportList.current = props.reportsList;
    });

    // Run if reportUri changes
    useEffect(() => {
      debugger;
      if (lastReportList.current !== props.reportsList) {
        setReportList(props.setSdk);
      }
    }, [ props.reportList ]);

    let menuItems = [];
    reportsList.itemsList().forEach(reportName => {
        let reportUri = reportsList.itemsCmd(reportName, 'self', 'link', 'uri');
        menuItems.push(<MenuItem value={reportUri}> {reportName}</MenuItem>);
        });
    
    const handleChange = (e) => {
        setCurrentReport(e.value);
    };

    let reportMenu =
        <FormControl>
            <InputLabel id="demo-simple-select-label">Reports</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentReport}
                onChange={handleChange}
            >
                {menuItems}
            </Select>;
            </FormControl>;
    
    let show = <div>
        {reportMenu}
        {currentReport !== null ? 
            <div id="page-wrap">
                <sas-report url={host} reportUri={currentReport} authenticationType={credentials}
                    style={style}></sas-report>></div>
            : <h2> Please select a report </h2>}
            </div>;
    
              
    return show;
  }

export default VasdkInReact;

