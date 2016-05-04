import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update_books } from '../actions';

class SignInScreen extends Component {    
   componentDidMount() {
       const { user } = this.props
        const { dispatch } = this.props
        // get the books on site load
       // dispatch(update_books());
    }
    
render() {
    var isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) var url = 'https://my-nightlife-coordinator.herokuapp.com/';
    else var url = 'http://127.0.0.1:3000/';
    return (
         <div>
            <a href={url+'auth/twitter/'}>
            <button>Sign in with Twitter</button>
            </a>
         </div>
        )
    }
}

SignInScreen = connect()(SignInScreen)
export default SignInScreen

