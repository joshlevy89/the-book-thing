import { combineReducers } from 'redux';

export function user(state={user_info: {}, mybooks: []},action) {
    switch (action.type) {
        case 'UPDATE_USER_INFO':
            return Object.assign({},state,{
                user_info: action.user
            })
        case 'RECEIVE_MY_BOOKS':
            return Object.assign({},state,{
                mybooks: action.mybooks
            })
        case 'ADD_BOOK':
           state.mybooks.push(action.book);
           return Object.assign({},state,{
                mybooks: state.mybooks
           })
        default: 
            return state;
    }
}

export function books(state=[],action) {
    switch (action.type) {
        case 'RECEIVE_ALL_BOOKS':
            return action.books
        default:
            return state
    }
}


export default combineReducers({
	user,
    books
})