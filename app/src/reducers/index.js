import { combineReducers } from 'redux';

export function user(state=[],action) {
    switch (action.type) {
        case 'UPDATE_LOGIN':
            return state = action.user;
        default: 
            return state;
    }
}


export default combineReducers({
	user
})