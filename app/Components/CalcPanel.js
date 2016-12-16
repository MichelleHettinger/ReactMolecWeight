import React, {Component} from 'react';

export default class CalcPanel extends Component {
	constructor(props) {
		super(props);
	}

	_handleClick (input, element, i) {
		this.props.newEdit(input, element, i);
	}

	render (){
		// Upon tapping a selected atom, loop all atoms
		const elementsToDisplay = this.props.mainState.elements.map( (element, i) => {
			return (
				<div key={i} className="calculatableElement">
					<button key={i} className="plusButton btn btn-xs" onClick={() => this._handleClick('+', element, i)}> + </button>

						<p className="calculatableAcronym">
							{element.elementAcronym} 
							<sub> {this.props.mainState.multipliers[i]} </sub>
						</p>


					<button className="minusButton btn btn-xs" onClick={() => this._handleClick("-", element, i)}> - </button>
				</div>
			)
		})

		if (elementsToDisplay.length != 0){

			console.log(elementsToDisplay);

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