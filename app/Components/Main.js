// Include React
import React, {Component} from 'react';

// Here we include all of the sub-components
import CalcPanel from './CalcPanel.js';
import ElementSelector from './ElementSelector.js';

 
export default class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			elements: [], multipliers:[],
			total: 0,
		};

		this.getElement = this.getElement.bind(this);
		this.setUserInput = this.setUserInput.bind(this);
	}

    componentDidMount() {
        $(document.body).on('keydown', this.setUserInput);
    }
    componentWillUnmount() {
        $(document.body).off('keydown', this.setUserInput);
    }

	getElement(newElement){
		console.log(newElement);

		// Push the element and multiplier into their respective arrays
		this.state.elements.push(newElement);
		this.state.multipliers.push(1);

		this.state.total += newElement.mass;

		this.setState({
			total: this.state.total,
			elements: this.state.elements,
			multipliers: this.state.multipliers
		});

		//console.log(this.state)
	}

	setUserInput(event){
		console.log(event.key)
		console.log(event.keyCode);

		if (event.keyCode >= 65 && event.keyCode <= 90){
			console.log('letter of the alphabet');

			let newText = this.state.text;
			newText += event.key;

			this.setState({text: newText})
		}
		//If backspace
		else if (event.keyCode === 8){

			//If there is user input to delete
			if (this.state.text.length > 0){
				//Remove the last letter
				const newText = this.state.text.slice(0,-1);

				this.setState({text: newText});

			}
		}
	}

	render() {

		return (
			<div className="container">
				<div className="row" id="header">
					<h1>Molecular Weight Calculator</h1>
				</div>

				<div className="row">

					<CalcPanel mainState={this.state} />

					<div className="col-sm-4 pull-right box" id="elements-panel">

						<div className="row">
							<h2 id="current-letters">Search</h2>
						</div>

						<ElementSelector userInput={this.state.text} newElement={this.getElement} />
					</div>
				</div>
			</div>
		)
	}
}