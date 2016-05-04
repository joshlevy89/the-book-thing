import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { start_trade, try_add_trade } from '../actions'

class Overlay extends Component {
    render() {
        const { dispatch, entry, overlayType, user } = this.props
        var entryId = entry._id;
        // check if this entry is in the user's library
        var isBookInLibrary = user.mybooks.filter(book=> {
             return book._id===entryId
        }).length > 0;
        if (isBookInLibrary) var str = 'Offer This Book';
        else var str = 'Request This Book';
        return (
            <span>
               {overlayType === 'standard' ? 
                        <button onClick = {()=>{
                            browserHistory.push('/propose-trade/'+entryId);
                            dispatch(start_trade(entryId));
                        }}>
                        { isBookInLibrary ? 'Offer This Book':'Request This Book' }
                        </button>:
                        <button onClick = {()=>{
                            browserHistory.push('/mytrades/');
                            dispatch(try_add_trade(entryId,user));
                            }}>
                        { isBookInLibrary ? 'Trade away this book':'Trade for this book' }
                        </button>
               }
            </span>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

Overlay = connect(mapStateToProps)(Overlay)
export default Overlay