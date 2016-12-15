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
	}

	render () {
		//Listener for firebase user login
		const user = firebase.auth().currentUser;

		if (!user){ console.log("Welcome to Mobile Molecular Weight") }


		if (!user){
			return (
				<div className="col-sm-4">
					<p>Login!</p>
				</div>
			)
		} else {
			return (
				<div className="col-sm-4">
					<p>{user.displayName}</p>
				</div>
			)
		}

	}

}