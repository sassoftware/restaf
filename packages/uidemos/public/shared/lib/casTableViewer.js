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

class CasDataViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            casTable: props.casTable,
            name    : props.name
        }
    }
    componentWillReceiveProps(nextProps) {

        this.setState({casTable: nextProps.casTable, name: nextProps.name});
    }
    render() {
        let {casTable, name} = this.state;
        let data = casTable.items('tables', name);

        let columns = [];
        data.get('schema').map(s => {
            columns.push(s.get('name'));
        });

        console.log(columns);
        let columnInfo = columns.map((c) => {
            return {
                Header: c,
                accessor: c,
                headerStyle: {
                    textAlign: "left",
                    backgroundColor: "lightgray"
                }
            }
        });

        let itemRows = data.get('rows');
        let rows = [];
        itemRows.map((r)=> {
            let row = {};
            ;
            r.map((value, j) => {
                row[columns[j]] = value;
            });
            rows.push(row);
        });
        return <div>
                <ReactTable
                    data={rows} columns={columnInfo}
                    defaultPageSize={10}/>
            </div>;

    }
}

function casTableViewer ( casTable, name, container ) {
    ReactDOM.render(<CasDataViewer  casTable={casTable} name={name}/>,
        document.querySelector(container));
    return true;
}

