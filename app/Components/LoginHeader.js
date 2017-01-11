import React, {Component} from 'react';
import CalcPanel from './CalcPanel.js';
import Modal from 'react-bootstrap-modal';

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

      newEmail: '',
      newName: '',
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.grabUserEmail = this.grabUserEmail.bind(this);
    this.grabUserPassword = this.grabUserPassword.bind(this);
    this.grabNewEmail = this.grabNewEmail.bind(this);
    this.grabNewName = this.grabNewName.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.updateSavedCompounds = this.updateSavedCompounds.bind(this);
    this.updateDeletedCompounds = this.updateDeletedCompounds.bind(this);

  }
  renderHeader (logged) {
    if (this.state.logged){
      return (
        <div className="col-sm-4" id="loggedInButtons">
          <div className="pull-right">
            <button
              type="button"
              data-toggle="modal"
              data-target="#accountModal" 
              className="btn btn-primary btn-sm"
            >
              MyAccount
            </button>
            <input type="button" value="Log Out" id="logoutButton" className="btn btn-warning btn-sm"
              onClick={this.logOut}
            />
          </div>

          <div className="modal fade" id="accountModal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h3 className="modal-title">Your Account!</h3>
                </div>
                <div className="modal-body">
                  <div className="row" >
                    <div className="col-sm-offset-2" id="myAccountForm">

                      <div className="form-inline">
                        <div className="form-group" style={{display:'flex',marginLeft:35}}>
                          <label>Name:</label>
                          <p style={{marginLeft:10}}>{this.state.user.displayName}</p>
                        </div>
                      </div>
                      <div className="form-inline">
                        <div className="form-group" style={{display:'flex',marginLeft:35}}>
                          <label>Email:</label>
                          <p style={{marginLeft:10}}>{this.state.user.email}</p>
                        </div>
                      </div>
                      <div className="form-inline">
                        <div className="form-group">
                          <label>New Name:</label>
                          <input 
                            type="text"
                            className="form-control input-md" 
                            id="newName"
                            placeholder={this.state.user.displayName}
                            onChange={text => this.grabNewName(text.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-inline">
                        <div className="form-group">
                          <label>New Email:</label>
                          <input 
                            type="text"
                            className="form-control input-md" 
                            id="newEmail"
                            placeholder={this.state.user.email}
                            onChange={text => this.grabNewEmail(text.target.value)}
                          />
                        </div>
                          <input 
                            type="button" 
                            value="Submit" 
                            id="updateAccountButton" 
                            className="btn btn-primary btn-sm"
                            onClick={this.updateProfile}
                          />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <p style={{textAlign:'center'}}>Need to reset your password?</p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-xs center-block"
                    onClick={this.resetPassword}
                  >
                    Click Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
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
      )
    }
  }

  grabUserEmail (userEmail) {
    //console.log(userEmail.target.value)
    this.setState({
      email: userEmail.target.value,
    });
  }

  grabUserPassword (userPassword) {
    //console.log(userPassword)
    this.setState({
      password: userPassword.target.value,
    });
  }

  grabNewEmail (newEmail) {
    //console.log(newName)
    this.setState({newEmail:newEmail})
  }

  grabNewName (newName) {
    //console.log(newName)
    this.setState({newName:newName})
  }

  updateProfile(){
    //Listener for firebase user login
    const user = firebase.auth().currentUser;

    if (this.state.newEmail.length > 0){
      user.updateEmail(this.state.newEmail).catch(function(error){
        //Error hapened
        alert("Update error. " + error);

      }).then((result)=>{
        // Update successful.
        //console.log("Email Updated")
        this.setState({newEmail: ''})
      })
    }

    if (this.state.newName.length > 0){
      user.updateProfile({
        displayName: this.state.newName,
      }).catch(function(error){
        //Error hapened
        alert("Update error. " + error);

      }).then((result)=>{
        // Update successful.
        //console.log("Name Updated")
        this.setState({newName: ''})
      })
    }
  }

  resetPassword(){
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().catch(function(error){
      alert('Error. ' + error);
    }).then((result)=>{
      alert('Email Sent!');
    })
  }

  setAccountModalVisible (visible) {

    this.setState({accountModalVisible:visible})
  }

  logIn () {
    //Login and then get the users saved data.
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch( error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error " + errorCode + ". " + errorMessage)

    }).then( user => {
      //console.log(user);
      if (user){
        firebase.database().ref('users/' + user.uid + '/compounds').once('value').then( snapshot => {
          //Grab 'snapshot' of the users saved compounds.
          const allCompounds = snapshot.val();

          this.setState({
            user:user,
            userSavedCompounds: allCompounds,
            logged:true
          });
        });
      }
    });
  }

  signUp (){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error " + errorCode + ". " + errorMessage)

    }).then((newUserData) => {
      //console.log(newUserData);
      this.setLoginModalVisible(false);
    });
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
    firebase.database().ref('users/' + this.state.user.uid + '/compounds/' + compoundX).set({null}, () => {
      //console.log('Wrote to database');
      //$("#outerSavedDiv").empty();
      firebase.database().ref('users/' + this.state.user.uid + '/compounds').once('value').then( snapshot => {
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
    const header = this.renderHeader(this.state.logged);
    return (
      <div className="container">
        <div className="row" id="header">
          <div className="col-sm-8">
            <h1 id="MWTitle">Molecular Weight Calculator</h1>
          </div>
          {header}
        </div>
        <CalcPanel
          user={this.state.user}
          userLogged={this.state.logged}
          userCompounds={this.state.userSavedCompounds}
          updateSaved={this.updateSavedCompounds}
          updateDeleted={this.updateDeletedCompounds}
         />
      </div>
    )
  }
}