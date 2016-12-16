import React, {Component} from 'react';

import * as firebase from "firebase";
var config = {
	apiKey: "AIzaSyBQUQPgITUNyCSsjufVVhJp-4laWw21QdU",
	authDomain: "mobile-molecular-weight-85984.firebaseapp.com",
	databaseURL: "https://mobile-molecular-weight-85984.firebaseio.com",
	storageBucket: "mobile-molecular-weight-85984.appspot.com",
	messagingSenderId: "837319764944"
};

//Only one instance of firebase can run at a time
firebase.initializeApp(config);

export default class LoginHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	logIn () {

		console.log(this.state.email);
		console.log(this.state.password);

		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			alert("Error " + errorCode + ". " + errorMessage)

		}).then( userData => {

			if (userData){
				console.log(userData);
				console.log('logged in');

				//document.getElementByID('#loginModal').modal.close();

			}
			else {
				console.log("Failed to login")
			}
		})
	}

	signUp (){
		console.log("good")
	}
	logOut(){
		firebase.auth().signOut().catch(function(error){

			alert("Error " + error);

		}).then(function() {

			alert("You have signed out");

		}.bind(this))
	}
	render () {
		//Listener for firebase user login
		const user = firebase.auth().currentUser;

		//if (!user){ console.log("Welcome to Mobile Molecular Weight") }

		if (!user){
			return (
				<div className="col-sm-4" id="loginHeader">

                    	<div className="form-group">
                    		<div className="col-sm-9">
								<input type="text" className="form-control input-md" id="email" placeholder="Email Address"
									onChange={ text => this.setState({email: text.target.value}) }
								/>
							</div>
							<div className="col-sm-3">
					        	<input type="button" value="Log In" id="loginButton" className="btn btn-success btn-sm"
					        		onClick={this.logIn.bind(this)}
					        	/>
					        </div>
                    	</div>

                    	<div className="form-group">
                    		<div className="col-sm-9">
								<input type="password" className="form-control input-md" id="password" placeholder="Password"
									onChange={ text => this.setState({password: text.target.value}) }
								/>
							</div>
							<div className="col-sm-3">
					        	<input type="button" value="Register" className="btn btn-primary btn-sm"
					        		onClick={this.signUp.bind(this)}
					        	/>
					        </div>
                    	</div>





	

				</div>
			)
		} else {
			return (
				<div className="col-sm-4">
					<p>{user.displayName}</p>


		        	<input type="button" value="Log Out" className="btn btn-warning btn-sm"
		        		onClick={this.logOut.bind(this)}
		        	/>

				</div>
			)
		}

	}

}