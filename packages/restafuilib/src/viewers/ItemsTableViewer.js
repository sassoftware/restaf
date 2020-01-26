/*
 *  ------------------------------------------------------------------------------------
 *  * Copyright (c) SAS Institute Inc.
 *  *  Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  *  Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  limitations under the License.
 * ----------------------------------------------------------------------------------------
 *
 */

import React from 'react';

class ItemsTableViewer extends React.Component {
	constructor (props) {
		debugger;
		super(props);
		this.state = {
			store : props.store,
			folder: props.folder,
            title : props.title,
            
			onClick: {
				first: this.doCommand.bind(this, 'first'),
				next : this.doCommand.bind(this, 'next'),
				prev : this.doCommand.bind(this, 'prev'),
				last : this.doCommand.bind(this, 'last')
			}
		};
	}

	render () {
		debugger;
		let { folder } = this.state;
		return (
			<div>
				{this.makeMenu(folder)}
				{this.makeTable(folder)}
			</div>
		);
	}

	doCommand (rel) {
		let { store, folder } = this.state;
		store
			.apiCall(folder.scrollCmds(rel))
			.then(f => this.setState({ folder: f }));
	}

	makeMenu (folder) {
		let { onClick } = this.state;
		debugger;
		console.log(folder);
		let cmds = folder.scrollCmds();
		let menu = [];
		cmds.forEach((c, rel) => {
			menu.push(
				<button key={rel} onClick={onClick[rel]} className="button">
					{' '}
					{rel}{' '}
				</button>
			);
		});
		return menu;
	}

	makeTable (folder) {
		let itemsList = folder.itemsList();
		return (
			<div>
				{' '}
				<table className="table table-striped">
					<thead>
						<tr key="title">
							<th key="header" scope="col"> {this.state.title} </th>
						</tr>
					</thead>
					<tbody>
						{itemsList.map((m, i) => (
							<tr key={i} scope="row">
								<td key={m}> {m} </td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ItemsTableViewer;
