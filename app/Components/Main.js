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