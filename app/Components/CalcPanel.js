import React, {Component} from 'react';
import Modal from 'react-bootstrap-modal';

import * as firebase from "firebase";
const config = {
	apiKey: "AIzaSyBQUQPgITUNyCSsjufVVhJp-4laWw21QdU",
	authDomain: "mobile-molecular-weight-85984.firebaseapp.com",
	databaseURL: "https://mobile-molecular-weight-85984.firebaseio.com",
	storageBucket: "mobile-molecular-weight-85984.appspot.com",
	messagingSenderId: "837319764944"
};

// Get a reference to the database service
//const database = firebase.database();

export default class CalcPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chemicalName: '',

			//parenCount: 0,
			// parenAllowed: true,
			// firstElement: {},
			// firstElementPosition: null,
			// secondElement: {},
			// secondElementPosition: null,
		};

		this.getPlusMinus = this.getPlusMinus.bind(this);
		this.getMoleculeName = this.getMoleculeName.bind(this);

		this.displayElements = this.displayElements.bind(this);
		this.displayModalBody = this.displayModalBody.bind(this);

		this.saveMolecule = this.saveMolecule.bind(this);
	}

	//Clicking plus or minus
	getPlusMinus (input, element, i) {
		//console.log(input)

		this.props.newEdit(input, element, i);
	}
	getMoleculeName (userInput) {
		//console.log(userInput)
		this.setState({
			chemicalName: userInput,
		});
	}

	displayElements (elements) {
		//console.log(elements)

		return elements.map( (element, i) => {
			return (
				<div key={i} className="calculatableElement">
					<button key={i} className="plusButton btn btn-xs" onClick={() => this.getPlusMinus('+', element, i) }> + </button>

					<div className="calculatableAcronym">
						<p>
							{element.elementAcronym} 
							<sub> {this.props.mainState.multipliers[i]} </sub>
						</p>
					</div>

					<button className="minusButton btn btn-xs" onClick={() => this.getPlusMinus("-", element, i)}> - </button>
				</div>
			)
		})
	}
	displaySavedCompounds (userCompounds) {
		if (userCompounds != null) {

			//console.log(userCompounds);
			const compoundElements = Object.keys(userCompounds).map( (compoundX, i) => {

				const compoundName = userCompounds[compoundX].chemicalName;
				const compoundTotal = userCompounds[compoundX].total;

				//console.log("---------------");
				//console.log(compoundX + " - " + compoundName + " - " + compoundTotal);

				const thing = userCompounds[compoundX].elements.map( (elements, j) => {
					//console.log(elements)
					//console.log(j)

					const elementAcronym = elements.elementAcronym;
					const elementMultiplier = userCompounds[compoundX].multipliers[j];

					//console.log(elementAcronym + ' ' + elementMultiplier);

					return (
						<p key={j}>{elementAcronym} {elementMultiplier}</p>
					)

				});

				return (
					<div key={i}>
						<h4 key={i}>{compoundName} - {compoundTotal} g/mol</h4>

						{thing}

					</div>

				)

			});

			return compoundElements
		}
		else {
			return
		}
	}

	displayModalBody (compounds, userCompounds) {

		//console.log(compounds)

		if (this.props.userLogged) {
			return (
				<div className="modal-body">

					<div>
						<input type="text" className="form-control input-md" id="chemicalName" placeholder="Name"
							onChange={ text => this.getMoleculeName(text.target.value) }
						/>

	        	<input type="button" value="Save" id="saveMoleculeButton" className="btn btn-success btn-sm"
	        		onClick={this.saveMolecule}
	        	/>
					</div>

					{userCompounds}

				</div>
			)
		}
		else {
			return (
				<div className="modal-body">

					<p>You must login</p>

				</div>
			)
		}
	}

	saveMolecule () {
			const compArray = Object.keys(this.props.userCompounds);
			const userID = this.props.user.uid;

			const compoundNumber = compArray.length + 1;

			console.log(compArray)

			//Create a new data entry named compound#, where # is 1 plus their number of saved compounds
			firebase.database().ref('users/' + userID + '/compounds/compound' + compoundNumber).set({

					chemicalName: this.state.chemicalName,
					elements: this.props.mainState.elements,
					multipliers: this.props.mainState.multipliers,
					total: this.props.mainState.total.toFixed(3),

					//parenMultiplier: this.props.mainState.parenMultiplier,

			}, () => {
					console.log('Wrote to database');
					this.setState({chemicalName: ''});

					this.props.updateSavedCompounds;


			});
		
	}


	render (){
		//console.log(this.props)
		//console.log(this.state)

		const elementsToDisplay = this.displayElements(this.props.mainState.elements);
		const userCompounds = this.displaySavedCompounds(this.props.userCompounds);

		const modalBody = this.displayModalBody(this.props.userCompounds, userCompounds);


		if (this.props.mainState.elements.length != 0){

			return (
				<div>
					<div className="col-sm-8" id="calcPanelWith">
						<div className="row">
							<div className="col-sm-9">
								<h3 id="molecular-weight">Molecular Weight: {this.props.mainState.total.toFixed(3)} g/mol</h3>
							</div>
							<div>
								<button type="button" data-toggle="modal" data-target="#saveModal" className="btn btn-success btn-sm saveButton pull-right">Save</button>
			        </div>
						</div>

						<div className="row">
							<div className="elements-chosen">
								{elementsToDisplay}
							</div>
						</div>
					</div>

					<div className="modal fade" id="saveModal">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 className="modal-title">Your Compounds</h4>
								</div>

								<div className="modal-body">
									{modalBody}
								</div>

								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className="col-sm-8" id="calcPanelWithOut">

				<div className="row">
					<div>
						<h3>Start calculating!</h3>
					</div>
				</div>

			</div>
		)
	}
}



	// passParenToParent (parenData) {
	// 	this.props.newParen(parenData);
	// }
	// makeParenthesis (element, i) {
	// 	//console.log(element)
	// 	//console.log(i)

	// 	this.state.parenCount ++;

	// 	switch (this.state.parenCount) {
	// 		case 1:
	// 			this.setState({
	// 				firstElement: element,
	// 				firstElementPosition: i,
	// 			}, () => {



	// 			});

	// 			break;

	// 		case 2:
	// 			this.setState({
	// 				parenCount: 0,
	// 				secondElement: element,
	// 				secondElementPosition: i,
	// 			}
	// 			//Uncomment to bring parentheses functionality back
	// 			,() => { this.passParenToParent(this.state) } );

	// 			break;
	// 		default:
	// 			console.log('Check parentCount');
	// 	}
	// }
	// checkParen (element, positionOfClickedElement) {
	// 	//This function is executed immidately after clicking an element in the calc panel
	// 	//It comes here to determine if the user is clicking on an element already in parenthesis.
	// 	//If so, reset parenCount incase they had already clicked a viable element
	// 	//Otherwise the parenthesis can be 'placed' with the 

	// 	const parenMultiplier = this.props.mainState.parenMultiplier;

	// 	//If there are no parentheses present
	// 	if (parenMultiplier.length == 0){
	// 		console.log('good to go');

	// 		//Uncomment these two lines to bring functionality back
	// 		//this.makeParenthesis(element, positionOfClickedElement);
	// 	}
	// 	else {
	// 		console.log('-----');

	// 		//Iterate over every set of parentheses
	// 		parenMultiplier.forEach( pm => {
	// 			console.log(pm)

	// 			//If the element selected is within the range of a parentheses already in place
	// 			//Reset the parenthesis process
	// 			if (positionOfClickedElement >= pm.startPosition && positionOfClickedElement <= pm.endPosition){
	// 				console.log('you cannot do that');

	// 				//Uncomment these two lines to bring functionality back
	// 				//this.setState({parenCount: 0});
	// 			}
	// 			//Otherwise allow the parenthesis process to continue
	// 			//by invoking the makeParenthesis function
	// 			else {
	// 				console.log('good to go');

	// 				//Uncomment these two lines to bring functionality back
	// 				//this.makeParenthesis(element, positionOfClickedElement);
	// 			}
	// 		});
	// 	}
	// }