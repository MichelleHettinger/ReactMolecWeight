import React, {Component} from 'react';

export default class CalcPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			parenCount: 0,

			parenAllowed: true,

			firstElement: {},
			firstElementPosition: null,

			secondElement: {},
			secondElementPosition: null,
		};
	}

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
					console.log('hold on')
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
			this.makeParenthesis(element, positionOfClickedElement);
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
					this.setState({parenCount: 0});
				}
				//Otherwise allow the parenthesis process to continue
				//by invoking the makeParenthesis function
				else {
					console.log('good to go');
					this.makeParenthesis(element, positionOfClickedElement);
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

					<div onClick={()=> this.checkParen(element, i)}>
						<p className="calculatableAcronym">
							{element.elementAcronym} 
							<sub> {this.props.mainState.multipliers[i]} </sub>
						</p>
					</div>

					<button className="minusButton btn btn-xs" onClick={() => this._handleClick("-", element, i)}> - </button>
				</div>
			)
		})

		if (elementsToDisplay.length != 0){

			//console.log(elementsToDisplay);

			return (
				<div className="col-sm-8" id="calcPanelWith">

					<div className="row">
						<h3 id="molecular-weight">Molecular Weight: {this.props.mainState.total.toFixed(3)} g/mol</h3>
					</div>

					<div className="elements-chosen">
						{elementsToDisplay}
					</div>

				</div>
			)

		} else {

			return (
				<div className="col-sm-8" id="calcPanelWithOut">

					<div className="row">
						<h3 id="molecular-weight">Start calculating!</h3>
					</div>

				</div>
			)
		}


	}
}