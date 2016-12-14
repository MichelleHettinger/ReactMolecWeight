// Include React and axios
var React = require('react');
var axios = require('axios');

// Here we include all of the sub-components
var CalcPanel = require('./CalcPanel.js');
var ElementSelector = require('./ElementSelector.js');


var Main = React.createClass({

	getInitialState: function() {
		return {
			text: 'c',
		};

	},

	render: function() {

		return (
			<div className="container">
				<div className="row" id="header">
					<h1>Molecular Weight Calculator</h1>
				</div>


				<div className="row">

					<div className="col-sm-8">
					</div>

					<div className="col-sm-4 pull-right box" id="elements-panel">

						<div className="row">
							<h2 id="current-letters">Search</h2>
						</div>

						<ElementSelector userInput={this.state.text} />
					</div>

				</div>
			</div>
		)
	}
})

// Export the component back for use in other files
module.exports = Main;