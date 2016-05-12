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
        {mytrades.length===0 ? 
            <div style={{'marginLeft': '20px'}} className="mainLayout">
            You Have Not Offered Any Trades</div>:
            <div></div>
        }
        {mytrades.map(mytrade=>{
            return (
            <div style={{'marginBottom':'10px'}} key={mytrade._id}>
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