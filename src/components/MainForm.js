import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import axios from "axios";


class MainForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			valid: true,
			actionType: "crawl/",
			results: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ value: e.target.value, valid: (this.getValidationState() === 'success') })
	}

	getValidationState() {
		if (this.state.value.length <= 0) return null
		//validate input as url
		return (this.state.value.match(/((http|https):\/\/www\.)?.+\..+/)) ? 'success' : 'error';
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state.value);
		var config = {
			headers: {
				"Content-Type": "text/plain",
			},
			responseType: "text",
		};

		axios
			.post(
				`https://spiderfy.herokuapp.com/${this.state.actionType}`,
				`http://${this.state.value}`,
				config
			)
			.then((res) => {
				const data = res.data;
				const results = res.data.results;
				this.setState({
					data,
					results,
					loader: false,
					elapsedTimeVisiblity: true,
				});
				console.log("data", data);
			})
			.catch((err) => {
				this.setState({ error: true });
			});
	}

	render() {
		const {
			results
		} = this.state;
		return (
			<div className="mainform">
				<div className="instructions">
					Type a website and select an action
				</div>
				<div className="input">
					<form onSubmit={this.handleSubmit}>
						<FormGroup bsSize="large" validationState={this.getValidationState()}>
							<FormControl
								type="text"
								value={this.state.value}
								placeholder="e.g. google.com"
								onChange={this.handleChange} />
							<FormControl.Feedback />

						</FormGroup>
						<Button bsSize="large" bsStyle="primary" type="submit" onClick={this.handleSubmit} disabled={!this.state.valid}>
							Crawl!
						</Button>
					</form>
				</div>

				{results.length > 0 && (
					<div className="results">
						<div className="header">
							<span className="url">Url ({results.length})</span>
							<span className="text">Text</span>
						</div>
						<table className="result-list">
							{results.map((item, key) => (
								<tr tabIndex={key} >
									<td>
										<img
											src={item.thumbnail}
											target="_blank"
											alt={item.url}
											width={50}
											height={50}
										/>
									</td>
									<td>
										<a href={item.link} target="_blank">
											{" "}
											{item.link}
										</a>
									</td>
									<td>{item.text}</td>
								</tr>

							))}
						</table>
					</div>
				)}

			</div>


		)
	}
}

export default MainForm;