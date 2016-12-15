import React, {Component} from 'react';

export default class CalcPanel extends Component {
	constructor(props) {
		super(props);
	}

	_handleClick (input, element, i) {
		console.log(this.props)
		//this.props.newEdit(input, element, i);
	}

	render (){
		console.log(this.props)

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

		return (
			<div className="col-sm-8">

				<div className="row">
					<p id="molecular-weight">Molecular Weight: {this.props.mainState.total.toFixed(3)} g/mol</p>
				</div>

				<div className="elements-chosen">
					{elementsToDisplay}
				</div>

			</div>
		)
	}
}