// Include React and axios
var React = require('react');
var axios = require('axios');

// Here we include all of the sub-components
var CalcPanel = require('./CalcPanel.js');
var ElementSelector = require('./ElementSelector.js');


var Main = React.createClass({

	getInitialState: function() {
		return {
			text: 'Hello world',
		};

	},

	render: function() {

		return (
			<div className="container">
				<div className="row">

					<p>{this.state.text}</p>

				</div>
			</div>
		)
	}
})

// Export the component back for use in other files
module.exports = Main;