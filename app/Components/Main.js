// Include React
import React, {Component} from 'react';

// Here we include all of the sub-components
import LoginHeader from './LoginHeader.js';
import CalcPanel from './CalcPanel.js';
import ElementSelector from './ElementSelector.js';

export default class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			elements: [], multipliers:[],
			parenMultiplier: [],
			total: 0,
		};

		this.getElement = this.getElement.bind(this);
		this.getEdit = this.getEdit.bind(this);
		this.getParen = this.getParen.bind(this);
	}


	getElement (newElement) {
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
	getEdit (input, element, i) {
		//console.log("------------------------------------------");
		//console.log(input + " one " + element.elementName + " at position: " + i);

		//console.log(i)

		if (input == '+'){
			this.state.multipliers[i] += 1;
			this.state.total += element.mass;
		}
		else if (input == '-'){
			this.state.multipliers[i] -= 1;
			this.state.total -= element.mass;
		}

		for (let j=0; j<this.state.multipliers.length; j++){
			if (this.state.multipliers[j] == 0){
				this.state.multipliers.splice(j, 1);
				this.state.elements.splice(j, 1);
			}
		}

		this.setState({
			total: this.state.total,
			elements: this.state.elements,
			multipliers: this.state.multipliers
		})

		console.log(this.state);
	}


	calculateTotal () {

		//Loop for every set of parenthesis
		for (let i=0; i<this.state.parenMultiplier.length; i++){
			console.log(this.state);

			for (let j=this.state.parenMultiplier[i].startPosition; j<=this.state.parenMultiplier[i].endPosition; j++){
				
				this.state.multipliers[j] *= this.state.parenMultiplier[i].multiplier;

				console.log(this.state);

			}

		}
	}

	getParen (parenData) {
		//console.log(parenData);

		const startPosition = parenData.firstElementPosition;
		const endPosition = parenData.secondElementPosition;

	 	let newParenMultiplier = this.state.parenMultiplier;

	 	newParenMultiplier.push({
			endPosition,
			startPosition,
			multiplier: 2,
		});

		this.setState({
			parenMultiplier: newParenMultiplier,
		}, this.calculateTotal );
	}


	render () {

		return (
			<div className="container">
				<div className="row" id="header">
					<div className="col-sm-8">
						<h1 id="MWTitle">Molecular Weight Calculator</h1>
					</div>

					<LoginHeader />
				</div>

				<div className="row">

					<CalcPanel mainState={this.state} newEdit={this.getEdit} newParen={this.getParen} />

					<div className="col-sm-4 pull-right" id="elements-panel">

						<div className="row">
							<input type="text" className="form-control input-md" id="search" placeholder="Search for an element. Ex. 'car' for carbon."
								onChange={ text => this.setState({text: text.target.value}) }
							/>
						</div>

						<ElementSelector userInput={this.state.text} newElement={this.getElement} />
					</div>
				</div>
			</div>
		)
	}
}