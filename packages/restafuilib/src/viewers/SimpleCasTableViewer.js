/*
 * ------------------------------------------------------------------------------------
 *   Copyright (c) SAS Institute Inc.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 * ---------------------------------------------------------------------------------------
 *
 */

import React from 'react';
function Table (props) {
	let { data } = props;
	debugger;
	let theadRows = data.get('schema').map(s => {
		let name = s.get('name');
		return (
			<th key={name} scope="col" style={{ backgroundColor: 'lightgrey' }}>
				{name}
			</th>
		);
	});
	let thead = <thead> {theadRows} </thead>;

	let tbodyRows = data.get('rows').map(row => {
		let thisRow = (
			<tr>
				{row.map((col, index) => {
					let v = <input type="text" value={col} />;
					return <td key={index}> {v} </td>;
				})}
			</tr>
		);
		return thisRow;
	});
	let tbody = <tbody> {tbodyRows} </tbody>;

	return (
		<div>
			<table class="table table-striped">
				{thead}
				{tbody}
			</table>
		</div>
	);
}

class SimpleCasTableViewer extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			data     : props.folder.items('tables', props.tableName),
			tableName: props.tableName,
			title    : props.title
		};
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			data     : nextProps.folder.items('tables', nextProps.tableName),
			tableName: nextProps.TableName,
			title    : nextProps.title
		});
	}
	render () {
		return (
			<div>
				<Table data={this.state.data} title={this.state.title} />
			</div>
		);
	}
}
export default SimpleCasTableViewer;

/*
function casTableViewer (result, tableName, title, container) {
    let data = result.items('tables', tableName);
    debugger;
    ReactDOM.render(<TableViewer data={data}  title={title} />,
        document.querySelector(container));
    return true;
    }
*/
