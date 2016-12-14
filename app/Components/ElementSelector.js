var React = require('react');

var ElementsArray = require('./ElementsArray.js');


var ElementSelector = React.createClass({
	_handlePress: function(input) {
		this.props.newElement(input)
	},
	render: function(){
		function findElements (userInput){

			var listElements = [];
			var listElements2 = [];
			var listElements3 = [];

			// Loop through every typed letter
			for (i=0; i<userInput.length; i++){

				if (i==0){
					//Loop through all elements
					for (j=0; j<ElementsArray.length;j++){
						//If the letters at position i match, push that element to the array
						if (userInput.charAt(i) == ElementsArray[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == ElementsArray[j].elementAcronym.charAt(i).toLowerCase()){
							listElements.push(ElementsArray[j]);
						}	
					}					
				}

				else if (i==1){
					//Loop through the first list of elements
					for (j=0; j<listElements.length;j++){
						//If the letters at position i match, push that element to a new array
						if (userInput.charAt(i) == listElements[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == listElements[j].elementAcronym.charAt(i).toLowerCase()){
							listElements2.push(listElements[j]);
						}	
					}
				}

				else if (i==2){
					//Loop through the second list of elements
					for (j=0; j<listElements2.length;j++){
						//If the letters at position i match, push that element to a new array
						if (userInput.charAt(i) == listElements2[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == listElements2[j].elementAcronym.charAt(i).toLowerCase()){
							listElements3.push(listElements2[j]);
						}	
					}
				}
			
			}

			//Depending on how many letters were typed in, display the appropriate array
			if (userInput.length == 0){
				return listElements;
			}
			else if (userInput.length == 1){
				//console.log(listElements);
				return listElements;
			}
			else if (userInput.length == 2){
				//console.log(listElements2);
				return listElements2;
			}
			else if (userInput.length == 3){
				//console.log(listElements3);
				return listElements3;
			}
			else if (userInput.length >= 4){
				return listElements3;
			}
		}

		//Map through the array of elements found and display them
		var elementsFound = findElements(this.props.userInput).map(function(element, i){
			return (
				<button containerStyle={{height:80}} key={i} onClick={() => this._handlePress(element)}>
					<div key={i}>
						<p key={i}>{element.atomicNumber}</p>
						<p>{element.elementAcronym}</p>
						<p>{element.elementName}</p>
						<p>{element.mass.toFixed(3)}</p>
					</div>
				</button>
			)
		}.bind(this))

		//Render the elementsFound 'div'
		return (
			<div>
		       {elementsFound}
	        </div>
		)
	
	}
})

module.exports = ElementSelector;
