/*
* Copyright © 2019, SAS Institute Inc., Cary, NC, USA.  All Rights Reserved.
* SPDX-License-Identifier: Apache-2.0
*/


 function SASReport (props){
	debugger;
	console.log(JSON.stringify(props, null, 4)) ;
	let show = (
			<div id="page-wrap">
				<sas-report
					url={props.url}
					reportUri={props.reportUri}
					authenticationType={props.credentials}
					style={props.style}></sas-report>
			</div>
	);
	return show;
}
export default SASReport;