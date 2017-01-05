import React, {Component} from 'react';
import Main from './Main.js';

import * as firebase from "firebase";
const config = {
	apiKey: "AIzaSyBQUQPgITUNyCSsjufVVhJp-4laWw21QdU",
	authDomain: "mobile-molecular-weight-85984.firebaseapp.com",
	databaseURL: "https://mobile-molecular-weight-85984.firebaseio.com",
	storageBucket: "mobile-molecular-weight-85984.appspot.com",
	messagingSenderId: "837319764944"
};

//Only one instance of firebase can run at a time
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export default class LoginHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
      user: {},
      userSavedCompounds: {},

			email: '',
			password: '',
			logged: false,
		};

		this.grabUserEmail = this.grabUserEmail.bind(this);
		this.grabUserPassword = this.grabUserPassword.bind(this);

		this.logIn = this.logIn.bind(this);
		this.signUp = this.signUp.bind(this);
		this.logOut = this.logOut.bind(this);

		this.updateSavedCompounds = this.updateSavedCompounds.bind(this);
    this.updateDeletedCompounds = this.updateDeletedCompounds.bind(this);
	}

	grabUserEmail(userEmail){
		//console.log(userEmail.target.value)

		this.setState({
			email: userEmail.target.value,
		});
	}
	grabUserPassword(userPassword){
		//console.log(userPassword)

		this.setState({
			password: userPassword.target.value,
		});
	}

	logIn () {
		//Login and then get the users saved data.

		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			alert("Error " + errorCode + ". " + errorMessage)

		}).then( user => {
			//console.log(user);

      firebase.database().ref('users/' + user.uid + '/compounds').once('value').then( snapshot => {

        //Grab 'snapshot' of the users saved compounds.
        const allCompounds = snapshot.val();

        this.setState({
        	user:user,
        	userSavedCompounds: allCompounds,
        	logged:true
        });
    	});
		});
	}
	signUp (){
		console.log("good")
	}
	logOut(){
		firebase.auth().signOut().catch( error => {

			alert("Error " + error);

		}).then( () => {

			this.setState({
				user: {},
				userSavedCompounds: 0,
				email: '',
				password: '',
				logged: false,
			});
		});
	}

  updateSavedCompounds (allCompounds) {
    this.setState({
      userSavedCompounds: allCompounds
    });
  }

	updateDeletedCompounds (compoundX) {
    //Create a new data entry named compound#
    const userID = this.state.user.uid;

    firebase.database().ref('users/' + userID + '/compounds/' + compoundX).set({null}, () => {
      //console.log('Wrote to database');
      //$("#outerSavedDiv").empty();

      firebase.database().ref('users/' + userID + '/compounds').once('value').then( snapshot => {
        //Grab 'snapshot' of the users saved compounds.
        const allCompounds = snapshot.val();

        //console.log(allCompounds);

        this.setState({
          userSavedCompounds: allCompounds,
        });

      });
    });



	}


	render () {
		//console.log(this.props)
		//console.log(this.state)

		if (this.state.logged == false){
			return (
				<div className="container">
					<div className="row" id="header">
						<div className="col-sm-8">
							<h1 id="MWTitle">Molecular Weight Calculator</h1>
						</div>
						<div className="col-sm-4" id="loginHeader">
		        	<div className="form-group">
		        		<div className="col-sm-9">
									<input type="text" className="form-control input-md" id="email" placeholder="Email Address"
										onChange={this.grabUserEmail}
									/>
								</div>
								<div className="col-sm-3">
				        	<input type="button" value="Log In" id="loginButton" className="btn btn-success btn-sm"
				        		onClick={this.logIn}
				        	/>
				        </div>
		        	</div>
		        	<div className="form-group">
		        		<div className="col-sm-9">
									<input type="password" className="form-control input-md" id="password" placeholder="Password"
										onChange={this.grabUserPassword}
									/>
								</div>
								<div className="col-sm-3">
						        	<input type="button" value="Register" className="btn btn-primary btn-sm"
						        		onClick={this.signUp}
						        	/>
				        </div>
							</div>
						</div>
					</div>

					<Main/>

				</div>
			)
		}

		return (
			<div className="container">
				<div className="row" id="header">
					<div className="col-sm-8">
						<h1 id="MWTitle">Molecular Weight Calculator</h1>
					</div>
					<div className="col-sm-4" id="loggedInButtons">
			    	<input type="button" value="Log Out" id="logoutButton" className="btn btn-warning btn-sm pull-right"
			    		onClick={this.logOut}
			    	/>
			    	<input type="button" value="My Account" id="accountButton" className="btn btn-primary btn-sm pull-right"
			    		onClick={this.getSave}
			    	/>
					</div>
				</div>

				<Main
					user={this.state.user}
					userCompounds={this.state.userSavedCompounds}
					userLogged={this.state.logged}
					updateSaved={this.updateSavedCompounds}
          updateDeleted={this.updateDeletedCompounds}

				/>

			</div>
		)
	}
}