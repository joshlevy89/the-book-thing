import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyTrade from '../components/MyTrade'

class TradeOffersScreen extends Component {
    render() {
        const { trade_offers } = this.props
        return (
        <div>
        {trade_offers.map(mytrade=>{
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
        trade_offers: state.user.trade_offers
    }
}

TradeOffersScreen = connect(
    mapStateToProps
)(TradeOffersScreen)

export default TradeOffersScreen