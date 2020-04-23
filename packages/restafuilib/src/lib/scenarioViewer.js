function Table(props) {
	let { data, onCellEdit, title, edit, err } = props;
	debugger;
	let thead = (
		<thead>
			<tr>
				<th style={{ backgroundColor: 'lightgrey' }} colspan={2} scope="col">
					{' '}
					{title}{' '}
				</th>
			</tr>
		</thead>
	);
	debugger;

	let tbody = (
		<tbody>
			{data.map((row, index) => {
				let name = index === err ? row.Name + '*' : row.Name;
				let v =
					edit === true ? (
						<input type="text" value={row.value} onChange={(e) => onCellEdit(index, e.target.value)} />
					) : (
						<input type="text" disabled value={row.value} />
					);
				return (
					<tr scope="row">
						<td> {name} </td>
						<td> {v} </td>
					</tr>
				);
			})}
		</tbody>
	);

	return (
		<div>
			<table class="table table-striped">
				{thead}
				{tbody}
			</table>
		</div>
	);
}

class ScenarioViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			runOnScore: props.runOnScore,
			title: props.title,
			edit: props.edit,
			err: -1,
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			data: nextProps.data,
			oncellChange: nextProps.onCellChange,
			title: nextProps.title,
			edit: nextProps.edit,
		});
	}
	_onCellEdit = (index, value) => {
		let data = this.state.data;
		let err = -1;
		let row = data[index];
		if (row.RawType === 'Num' && isNaN(value) === true) {
			err = index;
		}
		data[index].value = value;
		this.setState({ data: data, err: err });
	};
	_buttonClick = () => {
		if (this.state.err === -1) {
			this.state.runOnScore(this.state.data);
		}
	};
	render() {
		return (
			<div>
				<Table
					data={this.state.data}
					onCellEdit={this._onCellEdit}
					title={this.state.title}
					edit={this.state.edit}
					err={this.state.err}
				/>
				{this.state.edit === true && this.state.data.length > 0 ? (
					<button onClick={this._buttonClick}> Score Now </button>
				) : null}
			</div>
		);
	}
}
function scenarioViewer(data, runOnScore, title, container, edit) {
	ReactDOM.render(
		<ScenarioViewer data={data} runOnScore={runOnScore} title={title} edit={edit} />,
		document.querySelector(container)
	);
	return true;
}
