import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyTrade from '../components/MyTrade'

class MyTradesScreen extends Component {
    render() {
        const { mytrades } = this.props
        return (
        <div>
        {mytrades.map(mytrade=>{
            return (
            <div key={mytrade._id}>
                <MyTrade mytrade={mytrade}/>
            </div>
            )
        })}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        mytrades: state.user.mytrades
    }
}

MyTradesScreen = connect(
    mapStateToProps
)(MyTradesScreen)

export default MyTradesScreen