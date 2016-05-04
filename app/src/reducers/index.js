import { combineReducers } from 'redux';

export function user(state={user_info: {}, mybooks: [], mytrades: []},action) {
    switch (action.type) {
        case 'UPDATE_USER_INFO':
            return Object.assign({},state,{
                user_info: action.user
            })
        case 'RECEIVE_MY_BOOKS':
            return Object.assign({},state,{
                mybooks: action.mybooks
            })
        case 'RECEIVE_BOOK':
           // if book has user's username, add to mybooks list
           if (action.book.book.user_info.username!==state.user_info.username){
               return state
           }
           state.mybooks.push(action.book);
           return Object.assign({},state,{
                mybooks: state.mybooks
           })
        case 'RECEIVE_MY_TRADES':
            return Object.assign({},state,{
                mytrades: action.mytrades
        })
        case 'RECEIVE_TRADE_OFFERS':
            return Object.assign({},state,{
                trade_offers: action.trade_offers
        })
        case 'RECEIVE_TRADE':
            // if user made the trade, add it to my trades
            if (action.trade.trade.user_info.username===state.user_info.username){
                var new_mytrades = state.mytrades.slice();
                new_mytrades.push(action.trade)
                return Object.assign({},state,{
                    mytrades: new_mytrades
                })
            }
            // if user is involved in the trade, add it to trade offers
            else if (action.trade.trade.otherUser.username===state.user_info.username){
                var new_trade_offers = state.trade_offers.slice();
                new_trade_offers.push(action.trade)
                return Object.assign({},state,{
                    trade_offers: new_trade_offers
                })
            }
            else {
                return state
            }
        case 'DELETE_TRADE':
        // if user made the trade, add it to my trades
        if (action.trade.trade.user_info.username===state.user_info.username){
            // get the index of this trade in mytrades
            var ids = state.mytrades.map(mytrade=>{
                return mytrade._id
            });
            var ind = ids.indexOf(action.trade._id);
            var new_mytrades = state.mytrades.slice();
            new_mytrades.splice(ind,1)
            return Object.assign({},state,{
                mytrades: new_mytrades
            })
        }
        // if user is involved in the trade, add it to trade offers
        else if (action.trade.trade.otherUser.username===state.user_info.username){
            // get the index of this trade in mytrades
            var ids = state.trade_offers.map(trade_offer=>{
                return trade_offer._id
            });
            var ind = ids.indexOf(action.trade._id);
            var new_trade_offers = state.trade_offers.slice();
            new_trade_offers.splice(ind,1)
            return Object.assign({},state,{
                trade_offers: new_trade_offers
            })
        }
        else {
            return state
        }
        default: 
            return state;
    }
}

export function books(state=[],action) {
    switch (action.type) {
        case 'RECEIVE_ALL_BOOKS':
            return action.books
        case 'RECEIVE_BOOK':
            var newbooks = state.slice();
            newbooks.push(action.book);
            return newbooks
        default:
            return state
    }
}

export function trade(state={},action) {
    switch (action.type) {
        case 'START_TRADE':
            return { 'firstItem': action.entryId }
        case 'ADD_TRADE':
            return Object.assign({},state,{
                'secondItem': action.trade.trade.trade_info.secondItem
            })
        default:
            return state
    }
}


export default combineReducers({
	user,
    books,
    trade
})