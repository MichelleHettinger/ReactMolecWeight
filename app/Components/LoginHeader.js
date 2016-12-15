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
	}

	render () {
		//Listener for firebase user login
		const user = firebase.auth().currentUser;

		//if (!user){ console.log("Welcome to Mobile Molecular Weight") }

		if (!user){
			return (
				<div className="col-sm-4">

					<button className="btn" data-toggle="modal" data-target="#loginModal">Sign Up / Log In</button>


				    <div id="loginModal" className="modal fade" role="dialog">
				        <div className="modal-dialog">
				            <div className="modal-content">
				                <div className="modal-header">
				                    <button type="button" className="close" data-dismiss="modal">&times;</button>
				                    <h4 className="modal-title">Login or Sign Up</h4>
				                </div>
				                <div className="modal-body">
				                    <form className="form-horizontal">

				                    	<div className="form-group">
				                    		<div className="col-sm-2 col-sm-offset-2">
				                    			<label>Email</label>
				                    		</div>
				                    		<div className="col-sm-6">
           										 <input type="text" className="form-control input-md" id="email" placeholder="Email Address"
           										 	onChange={ text => this.setState({email: text.target.value}) }
           										/>
				                    		</div>
				                    	</div>

				                    	<div className="form-group">
				                    		<div className="col-sm-2 col-sm-offset-2">
				                    			<label>Password</label>
				                    		</div>
				                    		<div className="col-sm-6">
           										 <input type="password" className="form-control input-md" id="password" placeholder="Password"
           											onChange={ text => this.setState({email: text.target.value}) }
           										 />
				                    		</div>
				                    	</div>

									    <div className="form-group">
									    	<div className="col-sm-4 col-sm-offset-9">
									        	<input type="button" value="Log In" className="btn btn-info btn-sm" onClick={this.logIn.bind(this)}/>
									        	<button className="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
									        </div>
									    </div>

				                    </form> 
				                </div>
				            </div>
				        </div>
				    </div>


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