import React, {Component} from 'react';
import Modal from 'react-bootstrap-modal';

import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyBQUQPgITUNyCSsjufVVhJp-4laWw21QdU",
  authDomain: "mobile-molecular-weight-85984.firebaseapp.com",
  databaseURL: "https://mobile-molecular-weight-85984.firebaseio.com",
  storageBucket: "mobile-molecular-weight-85984.appspot.com",
  messagingSenderId: "837319764944"
};

// Get a reference to the database service
//const database = firebase.database();

export default class CalcPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chemicalName: '',

      //parenCount: 0,
      // parenAllowed: true,
      // firstElement: {},
      // firstElementPosition: null,
      // secondElement: {},
      // secondElementPosition: null,
    };

    this.getPlusMinus = this.getPlusMinus.bind(this);
    this.getMoleculeName = this.getMoleculeName.bind(this);

    this.displayElements = this.displayElements.bind(this);
    this.displayModalBody = this.displayModalBody.bind(this);

    this.saveMolecule = this.saveMolecule.bind(this);
    this.loadSavedMolecule = this.loadSavedMolecule.bind(this)
  }

  //Clicking plus or minus
  getPlusMinus (input, element, i) {
    //console.log(input)

    this.props.newEdit(input, element, i);
  }
  getMoleculeName (userInput) {
    //console.log(userInput)
    this.setState({
      chemicalName: userInput,
    });
  }

  displayElements (elements) {
    //console.log(elements)

    return elements.map( (element, i) => {
      return (
        <div key={i} className="calculatableElement">
          <button key={i} className="plusButton btn btn-xs" onClick={() => this.getPlusMinus('+', element, i) }> + </button>

          <div className="calculatableAcronym">
            <p>
              {element.elementAcronym} 
              <sub> {this.props.mainState.multipliers[i]} </sub>
            </p>
          </div>

          <button className="minusButton btn btn-xs" onClick={() => this.getPlusMinus("-", element, i)}> - </button>
        </div>
      )
    })
  }

  //This is where all the logic and divs for the saved compounds lives
  displaySavedCompounds (userCompounds) {
    if (userCompounds != null) {

      //console.log(userCompounds);
      const compoundElements = Object.keys(userCompounds).map( (compoundX, i) => {

        const compoundName = userCompounds[compoundX].chemicalName;
        const compoundTotal = userCompounds[compoundX].total;

        //console.log("---------------");
        //console.log(compoundX + " - " + compoundName + " - " + compoundTotal);

        const molecFormula = userCompounds[compoundX].elements.map( (elements, j) => {
          //console.log(elements)
          //console.log(j)

          const elementAcronym = elements.elementAcronym;
          const elementMultiplier = userCompounds[compoundX].multipliers[j];

          //console.log(elementAcronym + ' ' + elementMultiplier);

          return (
            <p key={j}>{elementAcronym}<sub>{elementMultiplier}</sub></p>
          )

        });

        return (
          <div key={i} className="individualSavedDiv panel panel-default">

            <div key={i} className="col-sm-9">
              <div key={i}>
                <h4 key={i}>{compoundName} - {compoundTotal} g/mol</h4>
              </div>
              <div className="savedFormula">
                {molecFormula}
              </div>
            </div>

            <div className="pull-right lodSavedCompounds">

              <input key={i} type="button" value="Load" data-compound={compoundX} className="btn btn-sm btn-info" 
                onClick={()=>{this.loadSavedMolecule(compoundX)}}
              />

              <input type="button" value="Delete" data-compound={compoundX} className="btn btn-sm btn-danger" 
                onClick={()=>{this.props.updateDeleted(compoundX)}}
              />

            </div>

          </div>

        )

      });

      return compoundElements
    }
    else {
      return
    }
  }

  displayModalBody (userCompounds) {

    //console.log(userCompounds)

    const elements = this.props.mainState.elements.map( (element, i) => {
      const multipliers = this.props.mainState.multipliers;

      return (
        <p key={i}>{element.elementAcronym}<sub>{multipliers[i]}</sub></p>
      )
    });

    const total = this.props.mainState.total.toFixed(3);

    if (this.props.userLogged) {

      return (
        <div className="modal-body">

        <div className="row" >
          <div className="col-sm-offset-2" id="saveFormRow">
            <div className="form-inline">
              <div className="form-group">
                <div id="weightToSave">
                  <label>Weight</label>
                  {total} g/mol
                </div>
              </div>
            </div>

            <div className="form-inline">
              <div className="form-group">
                <div id="formulaToSave">
                  <label>Formula</label>
                  {elements}
                </div>
              </div>
            </div>

            <div className="form-inline">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control input-md" id="chemicalName" placeholder="Name"
                  onChange={ text => this.getMoleculeName(text.target.value) }
                />
              </div>

              <input type="button" value="Save" id="saveMoleculeButton" className="btn btn-success btn-sm"
                onClick={this.saveMolecule}
              />

            </div>
          </div>
        </div>

        <hr/>

          <div className="row" id="outerSavedDiv">
            {userCompounds}
          </div>
        </div>
      )
    }

    else {
      return (
        <div className="modal-body">
          <p>You must login</p>
        </div>
      )
    }
  }

  saveMolecule () {
    const userID = this.props.user.uid;

    //If user has saved compounds, give it a name in database and write
    if (this.props.userCompounds){

      const compArray = Object.keys(this.props.userCompounds);

      let compoundNumber = compArray[compArray.length-1];
      compoundNumber = compoundNumber.charAt(compoundNumber.length -1);
      compoundNumber ++;
      compoundNumber = compoundNumber.toString();

      //console.log(compoundNumber)
      //console.log(compArray)

      //map through names. if it exists return true
      const compoundNameExists = Object.keys(this.props.userCompounds).map( (compoundX, i) => {
        const compoundName = this.props.userCompounds[compoundX].chemicalName;

        //console.log(compoundName);

        if (compoundName == this.state.chemicalName){
          return true
        }
        else {
          return false
        }
      });
      //console.log(compoundNameExists)

      //let has = $.inArray(true, compoundNameExists);
      //console.log(has);

      //-1 means that true was not found, meaning that the chosen name has not been used before.
      if ( $.inArray(true, compoundNameExists) == -1 && this.state.chemicalName != '' ) {

        //Create a new data entry named compound#
        firebase.database().ref('users/' + userID + '/compounds/compound' + compoundNumber).set({

            chemicalName: this.state.chemicalName,
            elements: this.props.mainState.elements,
            multipliers: this.props.mainState.multipliers,
            total: this.props.mainState.total.toFixed(3),

            //parenMultiplier: this.props.mainState.parenMultiplier,

        }, () => {
            //console.log('Wrote to database');

            firebase.database().ref('users/' + userID + '/compounds').once('value').then( snapshot => {
              //Grab 'snapshot' of the users saved compounds.
              const allCompounds = snapshot.val();

              //console.log(allCompounds);

              //this.setState({chemicalName: ''});

              this.props.updateSaved(allCompounds);
            });
        });
      }
      //Invalid input
      else {
        const alertDismiss = $(".alert-dismissible");

        //console.log(alertDismiss.length);

        //If there's not already an alert, display one
        if (alertDismiss.length == 0){
          //Display dismissible alert if name is taken
          $("#saveFormRow").append('<div class="alert alert-warning alert-dismissible fade in col-sm-9" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Invalid Name!</strong> Check your compounds below.</div>');
        }
      }
    }

    else {
      //Create a new data entry named compound1
      firebase.database().ref('users/' + userID + '/compounds/compound1').set({

          chemicalName: this.state.chemicalName,
          elements: this.props.mainState.elements,
          multipliers: this.props.mainState.multipliers,
          total: this.props.mainState.total.toFixed(3),

          //parenMultiplier: this.props.mainState.parenMultiplier,

      }, () => {

          console.log('Wrote to database');

          firebase.database().ref('users/' + userID + '/compounds').once('value').then( snapshot => {

            //Grab 'snapshot' of the users saved compounds.
            const allCompounds = snapshot.val();

            console.log(allCompounds);

            this.setState({chemicalName: ''});

            this.props.updateSaved(allCompounds);

          });

      });
    }
  }
  loadSavedMolecule (compoundX) {

    $('#saveModal').modal('hide')

    this.props.updateMainState(compoundX)
  }

  render (){
    //console.log(this.props)
    //console.log(this.state)

    const elementsToDisplay = this.displayElements(this.props.mainState.elements);

    const userCompounds = this.displaySavedCompounds(this.props.userCompounds);
    const modalBody = this.displayModalBody(userCompounds);


    //If there are elements in the panel
    if (this.props.mainState.elements.length != 0){
      return (
        <div>
          <div className="col-sm-8" id="calcPanelWith">
            <div className="row">
              <div className="col-sm-9">
                <h3 id="molecular-weight">Molecular Weight: {this.props.mainState.total.toFixed(3)} g/mol</h3>
              </div>
              <div>
                <button type="button" data-toggle="modal" data-target="#saveModal" className="btn btn-success btn-sm saveButton pull-right">Save</button>
              </div>
            </div>
            <div className="row">
              <div className="elements-chosen">
                {elementsToDisplay}
              </div>
            </div>
          </div>
          <div className="modal fade" id="saveModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h3 className="modal-title">Save Your Compound!</h3>
                </div>
                  {modalBody}
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="col-sm-8" id="calcPanelWithOut">
        <div className="row">
          <div>
            <h3>Start calculating!</h3>
          </div>
        </div>
      </div>
    )
  }
}



  // passParenToParent (parenData) {
  //  this.props.newParen(parenData);
  // }
  // makeParenthesis (element, i) {
  //  //console.log(element)
  //  //console.log(i)

  //  this.state.parenCount ++;

  //  switch (this.state.parenCount) {
  //    case 1:
  //      this.setState({
  //        firstElement: element,
  //        firstElementPosition: i,
  //      }, () => {



  //      });

  //      break;

  //    case 2:
  //      this.setState({
  //        parenCount: 0,
  //        secondElement: element,
  //        secondElementPosition: i,
  //      }
  //      //Uncomment to bring parentheses functionality back
  //      ,() => { this.passParenToParent(this.state) } );

  //      break;
  //    default:
  //      console.log('Check parentCount');
  //  }
  // }
  // checkParen (element, positionOfClickedElement) {
  //  //This function is executed immidately after clicking an element in the calc panel
  //  //It comes here to determine if the user is clicking on an element already in parenthesis.
  //  //If so, reset parenCount incase they had already clicked a viable element
  //  //Otherwise the parenthesis can be 'placed' with the 

  //  const parenMultiplier = this.props.mainState.parenMultiplier;

  //  //If there are no parentheses present
  //  if (parenMultiplier.length == 0){
  //    console.log('good to go');

  //    //Uncomment these two lines to bring functionality back
  //    //this.makeParenthesis(element, positionOfClickedElement);
  //  }
  //  else {
  //    console.log('-----');

  //    //Iterate over every set of parentheses
  //    parenMultiplier.forEach( pm => {
  //      console.log(pm)

  //      //If the element selected is within the range of a parentheses already in place
  //      //Reset the parenthesis process
  //      if (positionOfClickedElement >= pm.startPosition && positionOfClickedElement <= pm.endPosition){
  //        console.log('you cannot do that');

  //        //Uncomment these two lines to bring functionality back
  //        //this.setState({parenCount: 0});
  //      }
  //      //Otherwise allow the parenthesis process to continue
  //      //by invoking the makeParenthesis function
  //      else {
  //        console.log('good to go');

  //        //Uncomment these two lines to bring functionality back
  //        //this.makeParenthesis(element, positionOfClickedElement);
  //      }
  //    });
  //  }
  // }