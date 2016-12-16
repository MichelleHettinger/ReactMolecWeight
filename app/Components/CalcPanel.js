import React, {Component} from 'react';

export default class CalcPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			parenCount: 0,

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

	getParen (element, i) {
		//console.log(element)
		//console.log(i)

		this.state.parenCount ++;

		switch (this.state.parenCount) {
			case 1:

				this.setState({
					firstElement: element,
					firstElementPosition: i,
				});

				break;

			case 2:

				this.setState({
					parenCount: 0,
					secondElement: element,
					secondElementPosition: i,

				}

				) //Uncomment to bring parentheses functionality back
				//,() => { this.passParenToParent(this.state) } );

				
				break;

			default:
				console.log('Check parentCount');
		}
	}

	render (){
		// Upon tapping a selected atom, loop all atoms
		const elementsToDisplay = this.props.mainState.elements.map( (element, i) => {
			return (
				<div key={i} className="calculatableElement">
					<button key={i} className="plusButton btn btn-xs" onClick={() => this._handleClick('+', element, i)}> + </button>

					<div onClick={()=> this.getParen(element, i)}>
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