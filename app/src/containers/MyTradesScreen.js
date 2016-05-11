import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyTrade from '../components/MyTrade';
require('../../styles/index.scss');


class MyTradesScreen extends Component {
    render() {
        const { mytrades } = this.props
        return (
        <div style={{'marginLeft':'10px'}}>
         <h2 className="mainLayout">Proposed Trades</h2>
        {mytrades.map(mytrade=>{
            return (
            <div style={{'margin-bottom':'10px'}} key={mytrade._id}>
                <MyTrade mytrade={mytrade} tradeType={'proposal'}/>
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