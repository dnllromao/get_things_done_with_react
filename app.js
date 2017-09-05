class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tasks: [
				{
					task: "Faire la vaissaile",
					done: false
				}
			]
		}
	}

	_addTask(task) {
		let newTask = [{
			task: task,
			done: false
		}];
		const tasks = [...this.state.tasks, ...newTask ];
		this.setState({
			tasks: tasks
		});

	}

	_updateTask(task) {
		const tasks = [...this.state.tasks];
		tasks[task.props.index]['done'] = !tasks[task.props.index]['done'];
		this.setState({
			tasks: tasks
		});
	}

	render() {
		const tasks = this.state.tasks;
		return (
			<div className="container">
				<InputGroup addTask={this._addTask.bind(this)} />
				<TaskList tasks={tasks} updateTask={this._updateTask.bind(this)} />
			</div>
		);
	}
}

class InputGroup extends React.Component {

	_handleSubmit(e) {
		e.preventDefault();
		let task = this._task
		if (task.value) {
			this.props.addTask(task.value);
			this._task.value = "";
		}
		
	}

	render() {
		return (
			<form onSubmit={ this._handleSubmit.bind(this) }>
				<div className="form-group">
					<label htmlFor="">Task:</label>
					<input type="text" className="form-control" ref={(input) => this._task = input} />
				</div>
				<button className="btn btn-primary">Add</button>
			</form>
		);
	}
}

class TaskList extends React.Component {
	render() {
		
		return (
			<form>
				{this.props.tasks
					.filter( (task) => {
						return !task.done;
					})
					.map( (task, index) => {
						return (<Task   key={index} 
										index={index} 
										task={task.task} 
										updateTask={this.props.updateTask} 
										checked={false}
								/>);
					})
				}
				<p><b>Done</b></p>
				{this.props.tasks
					.filter( (task) => {
						return task.done;
					})
					.map( (task, index) => {
						return (<Task   key={index} 
										index={index} 
										task={task.task} 
										updateTask={this.props.updateTask} 
										checked={true}
								/>);
					})
				}
			</form>
		);
	}
}


class Task extends React.Component {

	render() {
		return(
			<div className="checkbox">
				<label htmlFor="">
					<input  type="checkbox" 
							checked={ (this.props.checked)?"checked":"" } 
							onChange={ () => this.props.updateTask(this) } 
							ref={ (input) => this._task = input }
					/>
					{this.props.task}
				</label>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));