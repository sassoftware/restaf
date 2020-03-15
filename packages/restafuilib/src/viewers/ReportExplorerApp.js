import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function ReportExplorerApp (props) {
  debugger;
  let { host, style, credentials ,reportsList} = props;
  let [currentReport, setCurrentReport] = useState(null);
  let [menuList, setMenuList] = useState([]);

  console.log(props);

  useEffect(() => {
    debugger;
     let menuItems = reportsList.map(t => {
			return (
				<MenuItem key={t.uri} value={t.uri}>
					{t.name}
				</MenuItem>
      );
     });
    setMenuList(menuItems);
    setCurrentReport(reportsList[ 0 ].uri);
  }, []);
   
  debugger;

  const handleChange = (e) => {
    debugger;
    console.log(e.target.value);
    setCurrentReport(e.target.value);
    };

    let reportMenu =
        <FormControl>
            <InputLabel id="demo-simple-select-label">Select a report to view</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentReport}
                onChange={handleChange}
            >
                {menuList}
            </Select>
            </FormControl>;
    
  console.log(host);
  console.log(currentReport);
  console.log(credentials);
  console.log(style);
    let show = <div>
        {reportMenu} 
        <div id="page-wrap">
                <sas-report url={host} reportUri={currentReport} authenticationType={credentials}
                 style={style}>
                </sas-report>
      </div>
            </div>;
    
              
    return show;
  }

export default ReportExplorerApp;

