import React, { Component } from 'react';
import Book from './Book';
import { connect } from 'react-redux';
import { reject_trade, accept_trade } from '../actions';
import { Button } from 'react-bootstrap';


class MyTrade extends Component {
    render() {
        const { mytrade, mybooks, reject_trade, accept_trade, tradeType } = this.props;
        var firstItem = mytrade.trade.trade_info.firstItem;
        var secondItem = mytrade.trade.trade_info.secondItem;        
        // always list book in your library first...
       var isFirstItemInLibrary = mybooks.filter(book=> {
             return book._id===firstItem
        }).length > 0;
        var firstShow; var secondShow;
        if (isFirstItemInLibrary){
            firstShow = firstItem;
            secondShow = secondItem;
        }
        else {
            firstShow = secondItem;
            secondShow = firstItem;
        }
             
        return (
            <div>
                <Book key={firstShow} entryId={firstShow} overlayType={'standard'} {...this.props}/>
                <img style={{'text-align':'center'}} src='https://image.freepik.com/free-icon/exchange-arrows_318-42193.png' width='20px' height='20px'/>
                <Book key={secondShow} entryId={secondShow} overlayType={'standard'} {...this.props}/>
                {tradeType==='offer' ?
                <span>
                <Button bsStyle="success" onClick={()=>reject_trade(mytrade)}>Delete</Button>
                <Button bsStyle="danger" onClick={()=>accept_trade(mytrade)}>Accept</Button>
                </span>
                :<span></span>}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        mybooks: state.user.mybooks,
        books: state.books
    }
}

MyTrade = connect(
    mapStateToProps,
    { reject_trade, accept_trade }
)(MyTrade)
export default MyTrade