var React = require('react');


var CalcPanel = React.createClass({

	_handlePress: function(input, element, i) {
		this.props.newEdit(input, element, i);
	},
	render: function(){
		// Upon tapping a selected atom, loop all atoms
		var elementsToDisplay = this.props.selectedElements.map(function(element, i){

			return (
				<div key={i}>
					<button key={i} onClick={() => this._handlePress('+', element, i)}> + </button>

					<p>
						{element.elementAcronym}

						<p> {this.props.elementMultipliers[i]} </p>
					</p>

					<button onClick={() => this._handlePress("-", element, i)}> - </button>
				</div>
			)
		}.bind(this))

		return (
			<div>
				<div>
					<p>Molecular Weight: {this.props.total.toFixed(3)} g/mol</p>
				</div>

				<div>
					{elementsToDisplay}
				</div>
			</div>
		)
	}
})

// Export the componen back for use in other files
module.exports = CalcPanel;