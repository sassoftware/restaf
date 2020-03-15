import React from 'react';
import { Fragment } from 'react';

function SasReport (props) {
	debugger;

	console.log(`now showing the report  ${props.name} = ${props.reportUri}`);
	
	let show1 =	<Fragment><sas-report
			url={props.url}
			reportUri={props.reportUri}
			authenticationType={props.credentials}
			style={props.style}
			className={props.className}
	>
			</sas-report></Fragment>;

	console.log(props.style);

	return show1;
}

export default SasReport;
