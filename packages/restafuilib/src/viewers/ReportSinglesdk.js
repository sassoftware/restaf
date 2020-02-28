import React from 'react';
function ReportSinglesdk (props) {
    debugger;

  console.log(`now showing the report  ${props.name} = ${props.reportUri}`);
  let show = (
		<div>
			<div>
				<sas-report
					url={props.url}
					reportUri={props.reportUri}
					authenticationType={props.credentials}
					style={props.style}
				></sas-report>
			</div>
		</div>
  );

    return show;
  }

export default ReportSinglesdk;

