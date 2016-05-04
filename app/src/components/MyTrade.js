import React, { Component } from 'react';
import Book from './Book';
import { connect } from 'react-redux';
import { reject_trade } from '../actions'

class MyTrade extends Component {
    render() {
        const { mytrade, mybooks, reject_trade } = this.props;
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
                Trade this book
                <Book key={firstShow} entryId={firstShow} overlayType={'standard'} {...this.props}/>
                For This book
                <Book key={secondShow} entryId={secondShow} overlayType={'standard'} {...this.props}/>
                <button onClick={()=>reject_trade(mytrade)}>Delete</button>
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
    { reject_trade }
)(MyTrade)
export default MyTrade