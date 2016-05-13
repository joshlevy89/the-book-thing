import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update_books } from '../actions';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
require('../../styles/index.scss');


class SignInScreen extends Component {    
    
render() {
    const { username } = this.props
    var isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) var url = 'https://the-book-thing.herokuapp.com/';
    else var url = 'http://127.0.0.1:3000/';
    return (
         <div className="mainLayout" style={{'textAlign':'center', 'marginTop':'100px'}}>
            <h2 style={{"marginBottom":'20px'}}>The Book Thing</h2>
            {username === undefined ? 
            (<a href={url+'auth/twitter/'}>
            <Button bsStyle="primary" bsSize="lg">Sign in with Twitter
            <i style={{'marginLeft':'5px'}} className="fa fa-twitter"></i>
            </Button>
            </a>):
            (<div>
            <Button onClick={()=>browserHistory.push('/mybooks')} bsStyle="primary" bsSize="lg">View My Books
            </Button>
            </div>
            )}
            <div>
            <h3>Trade books with people from all over</h3>
            </div>
         </div>
        )
    }
}

function mapStateToProps(state){
    return {
        username: state.user.user_info.username
    }
}

SignInScreen = connect(
mapStateToProps
)(SignInScreen)
export default SignInScreen

