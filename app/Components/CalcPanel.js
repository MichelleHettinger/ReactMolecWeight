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
const database = firebase.database();

export default class CalcPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {

			allCompounds: {},

			parenCount: 0,

			parenAllowed: true,

			firstElement: {},
			firstElementPosition: null,

			secondElement: {},
			secondElementPosition: null,


			chemicalName: 'rand',
		};
	}

	//Clicking plus or minus
	_handleClick (input, element, i) {
		this.props.newEdit(input, element, i);
	}


	passParenToParent (parenData) {
		this.props.newParen(parenData);
	}
	makeParenthesis (element, i) {
		//console.log(element)
		//console.log(i)

		this.state.parenCount ++;

		switch (this.state.parenCount) {
			case 1:
				this.setState({
					firstElement: element,
					firstElementPosition: i,
				}, () => {



				});

				break;

			case 2:
				this.setState({
					parenCount: 0,
					secondElement: element,
					secondElementPosition: i,
				}
				//Uncomment to bring parentheses functionality back
				,() => { this.passParenToParent(this.state) } );

				break;
			default:
				console.log('Check parentCount');
		}
	}
	checkParen (element, positionOfClickedElement) {
		//This function is executed immidately after clicking an element in the calc panel
		//It comes here to determine if the user is clicking on an element already in parenthesis.
		//If so, reset parenCount incase they had already clicked a viable element
		//Otherwise the parenthesis can be 'placed' with the 

		const parenMultiplier = this.props.mainState.parenMultiplier;

		//If there are no parentheses present
		if (parenMultiplier.length == 0){
			console.log('good to go');

			//Uncomment these two lines to bring functionality back
			//this.makeParenthesis(element, positionOfClickedElement);
		}
		else {
			console.log('-----');

			//Iterate over every set of parentheses
			parenMultiplier.forEach( pm => {
				console.log(pm)

				//If the element selected is within the range of a parentheses already in place
				//Reset the parenthesis process
				if (positionOfClickedElement >= pm.startPosition && positionOfClickedElement <= pm.endPosition){
					console.log('you cannot do that');

					//Uncomment these two lines to bring functionality back
					//this.setState({parenCount: 0});
				}
				//Otherwise allow the parenthesis process to continue
				//by invoking the makeParenthesis function
				else {
					console.log('good to go');

					//Uncomment these two lines to bring functionality back
					//this.makeParenthesis(element, positionOfClickedElement);
				}
			});
		}
	}

	render (){

		// Upon tapping a selected atom, loop all atoms
		const elementsToDisplay = this.props.mainState.elements.map( (element, i) => {
			return (
				<div key={i} className="calculatableElement">
					<button key={i} className="plusButton btn btn-xs" onClick={() => this._handleClick('+', element, i)}> + </button>

					<div className="calculatableAcronym" onClick={()=> this.checkParen(element, i)} >
						<p>
							{element.elementAcronym} 
							<sub> {this.props.mainState.multipliers[i]} </sub>
						</p>
					</div>

					<button className="minusButton btn btn-xs" onClick={() => this._handleClick("-", element, i)}> - </button>
				</div>
			)
		})

		const user = firebase.auth().currentUser;

		if (user!=null){
			//Turn the snapshot into an array containing each of their saved compounds
			firebase.database().ref('users/' + user.uid + '/compounds').once('value').then( snapshot => {

				//Grab 'snapshot' of the users saved compounds.
				const allCompounds = snapshot.val();

				this.setState({allCompounds: allCompounds});
				//console.log(this.state)
			});
		}

		//Grab list of compounds stored. ex [compound1, compound2, compound3]
		const usersCompounds = Object.keys(this.state.allCompounds).map( (compound) => {

			//console.log('---------------')

			return Object.keys(this.state.allCompounds[compound].elements).map( (properties, i) => {

				const compoundName = this.state.allCompounds[compound].chemicalName


				const elementAcronym = this.state.allCompounds[compound].elements[properties].elementAcronym;
				const elementMultiplier = this.state.allCompounds[compound].multipliers[properties];

				//console.log(elementAcronym + " " + elementMultiplier);


				return (
					<div key={i}>
						<h3 key={i}>{compoundName}</h3>
						<p>{elementAcronym} {elementMultiplier}</p>
					</div>
				)

			})

		});


		if (elementsToDisplay.length != 0){

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
									{usersCompounds}
								</div>

								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								</div>

							</div>
						</div>
					</div>



				</div>

			)

		} else {

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
}