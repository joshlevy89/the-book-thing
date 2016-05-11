export function update_user_details(fieldName,value){
    return (dispatch,getState) => {
     const body = {
            user: getState().user.user_info,
            fieldName: fieldName,
            value: value
        }
    // add to db
    fetch('/update_user_details', {
        method: 'post',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    // update state
    dispatch({
        type: 'UPDATE_USER_DETAILS',
        fieldName: fieldName,
        value: value
    })
    }
}

export function retrieve_user_details(){
    return (dispatch,getState) => {
        const body = {
            user: getState().user.user_info
        }
            // add to db
        fetch('/retrieve_user_details', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => { 
            if (json.message === 'got_details_successfully') {
                dispatch({
                    type: 'RECEIVE_USER_DETAILS',
                    details: json.details
                })
            }
         })
    }
}

export function update_user_info(user,mybooks){
       return {
        type: 'UPDATE_USER_INFO',
        user: user
       };
}

export function update_mybooks() {
    return (dispatch,getState) => {
        const body = {
            user: getState().user.user_info
        }
        fetch('/get_my_books', {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		})
        .then(response => response.json())
      	.then(json => { 
            if (json.message === 'got_mybooks_successfully') {
                dispatch(receive_my_books(json.books))
            }
         })
    }
}

export function receive_all_books(books) {
    return {
        type: 'RECEIVE_ALL_BOOKS',
        books: books
    }
}

export function update_books() {
 return (dispatch) => {
    fetch('/get_all_books')
    .then(response => response.json())
    .then(json => { 
        if (json.message === 'got_books_successfully') {
            dispatch(receive_all_books(json.books))
        }
    })
}
}

export function receive_my_books(books) {
        return {
            type: 'RECEIVE_MY_BOOKS',
            mybooks: books
        }
}

export function try_add_book(book,user) {
    return (dispatch,getState) => {
        // prevent addition if user not logged in
        if (Object.keys(getState().user.user_info).length === 0) {
            alert('Must be logged in to add a book!');
            return;
        }
        const body = {
            book: book,
            user: user
        }
        fetch('/add_book', {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		})
    }
}

export function receive_book(book){
    return {
        type: 'RECEIVE_BOOK',
        book: book
    }
}

export function update_mytrades() {
    return (dispatch,getState) => {
        const body = {
            user: getState().user.user_info
        }
        fetch('/get_my_trades', {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		})
        .then(response => response.json())
      	.then(json => { 
            if (json.message === 'got_mytrades_successfully') {
                dispatch(receive_my_trades(json.trades))
            }
         })
    }
}         

export function update_trade_offers() {
    return (dispatch,getState) => {
        const body = {
            user: getState().user.user_info
        }
        fetch('/get_trade_offers', {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		})
        .then(response => response.json())
      	.then(json => { 
            if (json.message === 'got_trade_offers_successfully') {
                dispatch(receive_trade_offers(json.trades))
            }
         })
    }
}         

export function receive_trade_offers(trades) {
        return {
            type: 'RECEIVE_TRADE_OFFERS',
            trade_offers: trades
        }
}

export function receive_my_trades(trades) {
        return {
            type: 'RECEIVE_MY_TRADES',
            mytrades: trades
        }
}

export function try_add_trade(entryId,user) {
    return (dispatch,getState) => {
        // prevent addition if user not logged in
        if (Object.keys(getState().user.user_info).length === 0) {
            alert('Must be logged in to add a book!');
            return;
        }
        var firstItem = getState().trade.firstItem;
        var secondItem = entryId;
        var trade = {
            firstItem: firstItem,
            secondItem: secondItem
        }
        // get the user to whom the trade is being proposed
        // first, find which item does not belong to you
        var isFirstItemInLibrary = getState().user.mybooks.filter(book=> {
             return book._id===firstItem
        }).length > 0;
        var checkItem;
        if (isFirstItemInLibrary) checkItem = secondItem;
        else checkItem = firstItem;
        // second, check which user that item belongs to
        var entry = getState().books.filter(book=>{
            return book._id === checkItem
        })[0];
        var otherUser = entry.book.user_info;
        var bookIdOfProposer;
        if (isFirstItemInLibrary) bookIdOfProposer = firstItem;
        else bookIdOfProposer = secondItem;
        
        const body = {
            trade: trade,
            user: user,
            otherUser: otherUser,
            bookIdOfProposer: bookIdOfProposer 
        }
        fetch('/add_trade', {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		})
    }
}

export function receive_trade(trade){
    return {
        type: 'RECEIVE_TRADE',
        trade: trade
    }
}

export function start_trade(entryId) {
    return {
        type: "START_TRADE",
        entryId: entryId
    }
}

export function reject_trade(trade){
    return (dispatch)=> {
        const body = {
        trade: trade
        }
        fetch('/delete_trade', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }
}

export function accept_trade(trade){
    return (dispatch,getState)=> {
        const body = {
        trade: trade,
        user: getState().user
        }
        fetch('/accept_trade', {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }
}

// following socketio accept trade, swap books (and delete_trade
// trade are called)
export function swap_books(trade){
    return {
        type: 'SWAP_BOOKS',
        trade: trade
    }
}

export function delete_trade(trade){
    return {
        type: 'DELETE_TRADE',
        trade: trade
    }
}