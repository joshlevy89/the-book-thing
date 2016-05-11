import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserField from '../components/UserField';
import { retrieve_user_details } from '../actions'
require('../../styles/UserDetailsScreen.scss')
require('../../styles/index.scss')


class UserDetailsScreen extends Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(retrieve_user_details())
    }

    render() {
        const { user_details } = this.props
        const labels = ["Last Name","First Name","City","State"];
    return (
         <div style={{'marginLeft':'10px'}} className="mainLayout">
            <h2>Profile</h2>
            <div>
            {labels.map(label=>{
               return <UserField key={label} user_details={user_details} label={label}/> 
            })}
            </div>
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_details: state.user.user_details
    }
}

UserDetailsScreen = connect(
    mapStateToProps
)(UserDetailsScreen)
export default UserDetailsScreen

