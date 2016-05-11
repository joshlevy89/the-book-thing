import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyTrade from '../components/MyTrade';
require('../../styles/index.scss');



class TradeOffersScreen extends Component {
    render() {
        const { trade_offers } = this.props
        return (
        <div style={{'marginLeft':'10px'}}>
        <h2 className="mainLayout">Trade Offers</h2>
        {trade_offers.map(mytrade=>{
            return (
            <div style={{'margin-bottom':'10px'}} key={mytrade._id}>
                <MyTrade mytrade={mytrade} tradeType={'offer'}/>
            </div>
            )
        })}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        trade_offers: state.user.trade_offers
    }
}

TradeOffersScreen = connect(
    mapStateToProps
)(TradeOffersScreen)

export default TradeOffersScreen