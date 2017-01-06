import React, {Component} from 'react';

export default class ElementSelector extends Component{
  constructor(props) {
    super(props);

    this.mapElementsFound = this.mapElementsFound.bind(this);
  }

  mapElementsFound(elementsFound){

    const elementsMapped = elementsFound.map( (element, i) => {
      return (
        <div key={i} className="col-sm-4 clickableElement box" onClick={()=>this.props.getElement(element)}>
          <p key={i} className="atomic-number-p">{element.atomicNumber}</p>
          <h2 className="acronym-h2">{element.elementAcronym}</h2>
          <p className="name-p">{element.elementName}</p>
          <p className="mass-p">{element.mass.toFixed(3)}</p>
        </div>
      )
    });

    return elementsMapped
  }

  render(){
    //Map through the array of elements found and display them
    const elementsRendered = this.mapElementsFound(this.props.elementsFound);

    //Render the elements
    return (
      <div className="row" id="elements-found">
        {elementsRendered}
      </div>
    )
  }
}
