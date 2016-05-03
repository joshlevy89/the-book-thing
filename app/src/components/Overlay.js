import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
 
class Overlay extends Component {
    render() {
        const { entry,mybooks, overlayType } = this.props
        var entryId = entry._id;
        // check if this entry is in the user's library
        var isBookInLibrary = mybooks.filter(book=> {
             return book._id===entryId
        }).length > 0;
        if (isBookInLibrary) var str = 'Offer This Book';
        else var str = 'Request This Book';
        return (
            <span>
               {overlayType === 'standard' ? 
                        <button onClick = {()=>browserHistory.push('/propose-trade/'+entryId)}>
                        { isBookInLibrary ? 'Offer This Book':'Request This Book' }
                        </button>:
                        <button onClick = {()=>browserHistory.push('/propose-trade/'+entryId)}>
                        { isBookInLibrary ? 'Trade away this book':'Trade for this book' }
                        </button>
               }
            </span>
        )
    }
}

function mapStateToProps(state) {
    return {
        mybooks: state.user.mybooks
    }
}

Overlay = connect(
    mapStateToProps
)(Overlay)
export default Overlay