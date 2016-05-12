import React, { Component } from 'react';
import { update_user_details } from '../actions'
import { connect } from 'react-redux'

class UserField extends Component {

    constructor(props) {
        super(props);
        this.state = { editing: false }
    }

    handleKeyPress(val,key,fieldName) {
    const { dispatch } = this.props
        if (key === 'Enter') {
            this.setState({
                editing: false
            })
            dispatch(update_user_details(fieldName,val));
        }
    }

    allowEdit() {
        const { label, user_details } = this.props
        var editable = (user_details[label] === undefined) || (this.state.editing)
        return editable
    }

	render() {
		const { label, user_details } = this.props
        var editable = this.allowEdit();
		return (
            <div>
            {editable ?
			 (
            <div><label style={{width:'100px','textAlign':'center'}}>{label}</label><input ref={label}
                style={{width:'200px'}}
                onKeyPress={e=>this.handleKeyPress(this.refs[label].value,e.key,Object.keys(this.refs)[0])}
                defaultValue={user_details[label]}/>
            </div>
            ):(
            <div>
            <label style={{width:'100px','textAlign':'center'}}>{label}</label>
            <label style={{width:'200px','textAlign': 'center'}}>{ user_details[label] }</label>
            <span style={{width:'50px'}}><button onClick = {()=>this.setState({editing: true})}>Edit</button></span>
            </div>
            )
            }
            </div>
		)
	}
}

UserField = connect()(UserField);

export default UserField