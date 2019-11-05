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

'use strict';
class SubmitItemViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store       : props.store,
            serviceType : props.serviceType,
            selected    : null,
            logLines    : null,
            handleChange: this.handleChange.bind(this),
            getLogLines : this.getLogLines.bind(this)
        };

    }
    componentWillMount() {
        let selected = this.state.selected;
        if (selected === null ) {
            selected = this.state.store.submitStatus().get(0);
        }
        this.state.getLogLines(selected);
        this.setState( {selected: selected})
    }

    componentWillReceiveProps(nextProps) {
        let {store} = nextProps;
        this.state.getLogLines(this.state.selected);
        this.setState({store: store});
    }

    render() {
        return <div>
            <select value={this.state.selected} onChange={this.state.handleChange} onSelect={this.state.handleChange}>
                {this.state.store.submitStatus().map((jobid) => <option key={jobid} value={jobid}>{jobid}</option>)}
            </select>
            <div><pre>{this.state.logLines}</pre></div>
        </div>
    }

    handleChange(e) {
        this.state.getLogLines(e.target.value);
        this.setState({selected: e.target.value})
    }

    getLogLines( selected ) {
        if (this.state.serviceType === 'CAS') {
            let currentJob = this.state.store.submitStatus(selected).job;
            this.setState({logLines: JSON.stringify(currentJob.items(), null, 4)});
        } else {
            let currentJob = this.state.store.submitStatus(selected).job;
            this.state.store.apiCall(currentJob.links('log'))
                .catch(err => err)
                .then(folder => {
                    let dataL = folder.items();
                    let outAll = [];
                    dataL.map((data, i) => {
                        let out;
                        let line = data.get('line').replace(/(\r\n|\n|\r)/gm, "");
                        if (line.length === 0) {
                            line = '  ';
                        }
                        let type = data.get('type');
                        if (type === 'title') {
                            out = <h2 key={i} className={type}> {line} </h2>;
                        } else {
                            out = <p key={i} className={type}> {line} </p>;
                        }
                        outAll.push(out);
                    });
                    this.setState({logLines: outAll});
                })
        }
    }

}
