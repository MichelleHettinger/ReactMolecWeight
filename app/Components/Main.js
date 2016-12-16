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
			total: 0,
		};

		this.getElement = this.getElement.bind(this);
		this.getEdit = this.getEdit.bind(this);
		//this.getUserInput = this.getUserInput.bind(this);
	}

    // componentDidMount() {
    //     $(document.body).on('keydown', this.getUserInput);
    // }
    // componentWillUnmount() {
    //     $(document.body).off('keydown', this.getUserInput);
    // }

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
	getEdit(input, element, i){
		console.log("------------------------------------------");
		console.log(input + " one " + element.elementName + " at position: " + i);

		console.log(i)

		if (input == '+'){
			this.state.multipliers[i] += 1;
			this.state.total += element.mass;
		}
		else if (input == '-'){
			this.state.multipliers[i] -= 1;
			this.state.total -= element.mass;
		}

		for (var j=0; j<this.state.multipliers.length; j++){
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
	// getUserInput(event){

	// 	let newText;

	// 	//Capturing letter
	// 	if (event.keyCode >= 65 && event.keyCode <= 90){

	// 		//console.log(event.key)
	// 		//console.log(event.keyCode);

	// 		//Capturing the very first input
	// 		if (this.state.text == "Search"){
	// 			this.state.text = '';

	// 			newText = event.key;
	// 		}
	// 		//2nd and 3rd inputs
	// 		else {
	// 			newText = this.state.text;
	// 			newText += event.key;
	// 		}

	// 		this.setState({text: newText})
	// 	}
	// 	//Capturing backspace
	// 	else if (event.keyCode === 8){
	// 		//console.log(event.key)
	// 		//console.log(event.keyCode);

	// 		//If there is user input to delete and it is not 'search'
	// 		if (this.state.text.length > 0 && this.state.text != "Search") {

	// 			//Remove the last letter
	// 			const newText = this.state.text.slice(0,-1);

	// 			//If this yields an empty string, make this.state.text display 'Search'
	// 			if (newText == ''){
	// 				this.setState({text: 'Search'});
	// 			} else {
	// 				this.setState({text: newText});
	// 			}

	// 		}
	// 	}
	// }

	render() {

		return (
			<div className="container">
				<div className="row" id="header">
					<div className="col-sm-8">
						<h1 id="MWTitle">Molecular Weight Calculator</h1>
					</div>

					<LoginHeader />
				</div>

				<div className="row">

					<CalcPanel mainState={this.state} newEdit={this.getEdit} />

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