import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignInScreen extends Component {
    render() {
    var isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) var url = 'https://my-nightlife-coordinator.herokuapp.com/auth/twitter/'
    else var url = 'http://127.0.0.1:3000/auth/twitter/'
    return (
         <a href={url}>
         <button>Sign in with Twitter</button>
         </a>
        )
    }
}

SignInScreen = connect()(SignInScreen)
export default SignInScreen

