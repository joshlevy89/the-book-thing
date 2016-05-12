import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import routes from './routes/index'
import reducers from './reducers';
import { update_user_info, update_mybooks, update_mytrades, 
      update_books, update_trade_offers, receive_book, 
      receive_trade, delete_trade, retrieve_user_details } from './actions'
var isProduction = process.env.NODE_ENV === 'production';
const middleware = isProduction ? [ thunk ]:[thunk, logger()];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);

// connect to socket io
var socket = io.connect('/');
socket.on('book_added', function(data) {
  store.dispatch(receive_book(data.book))
});
socket.on('got_user_info', function(data) {
   store.dispatch(update_books());
   store.dispatch(update_user_info(data.user));
   store.dispatch(update_mybooks());
   store.dispatch(update_mytrades());
   store.dispatch(update_trade_offers());
   store.dispatch(retrieve_user_details());
});
socket.on('trade_added', function(data) {
  store.dispatch(receive_trade(data.trade))
});
socket.on('trade_deleted', function(data){
  store.dispatch(delete_trade(data.trade))
});
socket.on('trade_accepted', function(data){
  store.dispatch(update_books());
  store.dispatch(update_mybooks());
  store.dispatch(update_mytrades());
  store.dispatch(update_trade_offers());
});


export default class App extends Component {
  render() {
    return (
	<Provider store={store}>
	<Router history={browserHistory}>
      { routes }
	</Router>
	</Provider>
    );
  }
}
