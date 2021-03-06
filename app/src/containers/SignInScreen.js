import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update_books, get_user_info } from '../actions';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
require('../../styles/index.scss');


class SignInScreen extends Component {    

componentDidMount() {
    const { dispatch } = this.props
    const urlUsername = this.props.params.urlUsername
    if (urlUsername !== undefined) {
    // get user info
    dispatch(get_user_info(urlUsername));
    }
}
    
render() {
    const { username } = this.props   

    var isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) var url = 'https://the-book-thing.herokuapp.com/';
    else var url = 'http://127.0.0.1:3000/';
    return (
         <div className="mainLayout" style={{'textAlign':'center', 'marginTop':'100px'}}>
            { username === undefined ? 
                <h2 style={{"marginBottom":'20px'}}>The Book Thing</h2>:
                <h2 style={{"marginBottom":'20px'}}>{'Welcome '+ username + '!'}</h2>
            }
            <a href={url+'auth/twitter/'}>
            <Button bsStyle="primary" bsSize="lg">Sign in with Twitter
            <i style={{'marginLeft':'5px'}} className="fa fa-twitter"></i>
            </Button>
            </a>
            {username !== undefined ? 
            (
            <div>
            <Button style={{'marginTop':'20px'}} bsStyle="success" bsSize="lg" onClick={()=>browserHistory.push('/mybooks')}>
            View My Books
            </Button>
            </div>
            ):(<div></div>)}
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

