import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import routes from './routes/index'
import reducers from './reducers';
var isProduction = process.env.NODE_ENV === 'production';
const middleware = isProduction ? [ thunk ]:[thunk, logger()];

let store = createStore(
	reducers,
	applyMiddleware(...middleware)
);

// connect to socket io
var socket = io.connect('/');

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
