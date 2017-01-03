import React, {Component} from 'react';

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

export default class LoginHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			logged: false,
		};

		this.logIn = this.logIn.bind(this);
		this.signUp = this.signUp.bind(this);
		this.logOut = this.logOut.bind(this);
		this.getSave = this.getSave.bind(this);

		this.grabUserEmail = this.grabUserEmail.bind(this);
		this.grabUserPassword = this.grabUserPassword.bind(this);
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

				this.setState({logged: true})

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
		firebase.auth().signOut().catch( error => {

			alert("Error " + error);

		}).then( () => {

			this.setState({logged: false})

		})
	}


	getSave(){

		var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');

		starCountRef.on('value', function(snapshot) {
		  updateStarCount(postElement, snapshot.val());
		});
	}


	grabUserEmail(userEmail){
		console.log(userEmail)

		this.setState({
			email: userEmail,
		})

		console.log(this.state)
	}

	grabUserPassword(userPassword){
		this.setState({
			password: userPassword,
		})
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
								onChange={ text => this.grabUserEmail(text.target.value) }
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
								onChange={ text => this.grabUserPassword(text.target.value) }
							/>
						</div>
						<div className="col-sm-3">
				        	<input type="button" value="Register" className="btn btn-primary btn-sm"
				        		onClick={this.signUp}
				        	/>
				        </div>
                	</div>
				</div>
			)
		}

		return (
			<div className="col-sm-4" id="loggedInButtons">
	        	<input type="button" value="Log Out" id="logoutButton" className="btn btn-warning btn-sm pull-right"
	        		onClick={this.logOut}
	        	/>
	        	<input type="button" value="My Account" id="accountButton" className="btn btn-primary btn-sm pull-right"
	        		onClick={this.getSave}
	        	/>
			</div>
		)

	}

}