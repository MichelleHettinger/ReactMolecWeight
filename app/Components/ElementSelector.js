import React, {Component} from 'react';
import ElementsArray from './ElementsArray.js';

export default class ElementSelector extends Component{
	constructor(props) {
		super(props);
	}

	_handleClick(input) {

		console.log(this.props)

		this.props.newElement(input);
		//console.log(input);
	}
	render(){
		const findElements = function elemFinder (userInput){

			let listElements = [];
			let listElements2 = [];
			let listElements3 = [];

			// Loop through every typed letter
			for (let i=0; i<userInput.length; i++){

				if (i==0){
					//Loop through all elements
					for (let j=0; j<ElementsArray.length;j++){
						//If the letters at position i match, push that element to the array
						if (userInput.charAt(i) == ElementsArray[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == ElementsArray[j].elementAcronym.charAt(i).toLowerCase()){
							listElements.push(ElementsArray[j]);
						}	
					}					
				}

				else if (i==1){
					//Loop through the first list of elements
					for (let j=0; j<listElements.length;j++){
						//If the letters at position i match, push that element to a new array
						if (userInput.charAt(i) == listElements[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == listElements[j].elementAcronym.charAt(i).toLowerCase()){
							listElements2.push(listElements[j]);
						}	
					}
				}

				else if (i==2){
					//Loop through the second list of elements
					for (let j=0; j<listElements2.length;j++){
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
		const elementsFound = findElements(this.props.userInput).map( (element, i) => {
			return (

				<div key={i} className="col-sm-4 clickableElement box" onClick={() => this._handleClick(element)}>
					<p key={i} className="atomic-number-p">{element.atomicNumber}</p>
					<h2 className="acronym-h2">{element.elementAcronym}</h2>
					<p className="name-p">{element.elementName}</p>
					<p className="mass-p">{element.mass.toFixed(3)}</p>
				</div>

			)
		})

		//Render the elementsFound 'div'
		return (

			<div className="row" id="elements-found">
		       {elementsFound}
	        </div>
		)
	
	}
}
