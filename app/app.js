// Include the Main React Dependencies
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Include the Main Component
import LoginHeader from'./Components/LoginHeader.js';

// This code here allows us to render our main component (in this case "Main")
ReactDOM.render(

	<LoginHeader />,
	document.getElementById('app')
)