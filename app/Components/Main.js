// Include React and axios
var React = require('react');

// Here we include all of the sub-components
var CalcPanel = require('./CalcPanel.js');
var ElementSelector = require('./ElementSelector.js');


var Main = React.createClass({
    componentDidMount: function() {
        $(document.body).on('keydown', this.setUserInpu);
    },

    componentWillUnmount: function() {
        $(document.body).off('keydown', this.setUserInpu);
    },

	getInitialState: function() {
		return {
			text: 'ag',
		};

	},

	setUserInpu: function(event){
		console.log(event.key)
		console.log(event.keyCode);

		if (event.keyCode >= 65 && event.keyCode <= 90){
			console.log('letter of the alphabet');

			this.state.text += event.key;

			this.setState({text: this.state.text})
		}
		//If backspace
		else if (event.keyCode === 8){

			//If there is user input to delete
			if (this.state.text.length > 0){
				//Remove the last letter
				var newText = this.state.text.slice(0,-1);

				this.setState({text: newText});

			}

		}

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