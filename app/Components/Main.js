// Include React
import React, {Component} from 'react';

// Here we include all of the sub-components
import CalcPanel from './CalcPanel.js';
import ElementSelector from './ElementSelector.js';
import ElementsArray from './ElementsArray.js';


export default class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
      elementsFound: [],

			elements: [], multipliers:[],
      total: 0,

			//parenMultiplier: [],

		};

		this.getUserInput = this.getUserInput.bind(this);
    this.findElements = this.findElements.bind(this);

		this.getElement = this.getElement.bind(this);
		this.getEdit = this.getEdit.bind(this);

		this.updateMainState = this.updateMainState.bind(this);
		//this.getParen = this.getParen.bind(this);
	}


  getUserInput (userInput) {
    //Set user input, then find elements.
    this.setState({
      text: userInput,
    }, () => {this.findElements(userInput)} )
  }
	findElements (userInput) {
    //Find the right elements, then setState for found elements.

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
      this.setState({
        elementsFound: listElements,
      })
		}
		else if (userInput.length == 1){
			//console.log(listElements);
      this.setState({
        elementsFound: listElements,
      })
		}
		else if (userInput.length == 2){
			//console.log(listElements2);
      this.setState({
        elementsFound: listElements2,
      })
		}
		else if (userInput.length == 3){
			//console.log(listElements3);
      this.setState({
        elementsFound: listElements3,
      })			}
		else if (userInput.length >= 4){
      this.setState({
        elementsFound: listElements3,
      })
		}
	}

  getElement (newElement) {
    //Add an element to the calculation panel and increase the total

    let currentElements = this.state.elements;
    let currentMultipliers = this.state.multipliers;
    let currentTotal = this.state.total;

    currentElements.push(newElement);
    currentMultipliers.push(1);
    currentTotal += newElement.mass;

    this.setState({
      total: currentTotal,
      elements: currentElements,
      multipliers: currentMultipliers,
    });

    //console.log(this.state)
    //console.log(newElement); 
  }
	getEdit (input, element, i) {
		//console.log("------------------------------------------");
		//console.log(input + " one " + element.elementName + " at position: " + i);

		//console.log(i)

		if (input == '+'){
			this.state.multipliers[i] += 1;
			this.state.total += element.mass;
		}
		else if (input == '-'){
			this.state.multipliers[i] -= 1;
			this.state.total -= element.mass;
		}

		for (let j=0; j<this.state.multipliers.length; j++){
			if (this.state.multipliers[j] == 0){
				this.state.multipliers.splice(j, 1);
				this.state.elements.splice(j, 1);
			}
		}

		this.setState({
			total: this.state.total,
			elements: this.state.elements,
			multipliers: this.state.multipliers
		})

		//console.log(this.state);
	}


	updateMainState (compoundX) {
		//console.log(compoundX);
		//console.log(this.props.userCompounds);

		const newElements = this.props.userCompounds[compoundX].elements;
		const newMultipliers = this.props.userCompounds[compoundX].multipliers;
		const newTotal = parseFloat(this.props.userCompounds[compoundX].total);

		this.setState({
			elements: newElements,
			multipliers: newMultipliers,
			total: newTotal,
		})

	}


	render () {
    //console.log(this.props)
    //console.log(this.state)

		return (
			<div className="row">

				<CalcPanel
          user={this.props.user}
          userLogged={this.props.userLogged}
          userCompounds={this.props.userCompounds}
          updateSaved={this.props.updateSaved}
          updateDeleted={this.props.updateDeleted}
          updateMainState={this.updateMainState}
          mainState={this.state}
          newEdit={this.getEdit}
          //newParen={this.getParen}
         />

				<div className="col-sm-4 pull-right" id="elements-panel">

					<div className="row">
						<input type="text" className="form-control input-md" id="search" placeholder="Search for an element. Ex. 'car' for carbon."
							onChange={ text => this.getUserInput(text.target.value) }
						/>
					</div>

					<ElementSelector elementsFound={this.state.elementsFound} newElement={this.getElement} />

				</div>
			</div>
		)
	}
}



  //Below are some functions related to trying to make parentheses


  // calculateTotal () {

  //  //Loop for every set of parenthesis
  //  for (let i=0; i<this.state.parenMultiplier.length; i++){
  //    console.log(this.state);

  //    for (let j=this.state.parenMultiplier[i].startPosition; j<=this.state.parenMultiplier[i].endPosition; j++){
        
  //      this.state.multipliers[j] *= this.state.parenMultiplier[i].multiplier;

  //      console.log(this.state);

  //    }

  //  }
  // }

  // getParen (parenData) {
  //  console.log(parenData);

  //  const startPosition = parenData.firstElementPosition;
  //  const endPosition = parenData.secondElementPosition;

  //    let newParenMultiplier = this.state.parenMultiplier;

  //    newParenMultiplier.push({
  //    endPosition,
  //    startPosition,
  //    multiplier: 2,
  //  });

  //  this.setState({
  //    parenMultiplier: newParenMultiplier,
  //  }, this.checkParen );
  // }