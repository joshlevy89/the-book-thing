import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'
import SignInScreen from '../containers/SignInScreen'
import BooksScreen from '../containers/BooksScreen'
import MyBooksScreen from '../containers/MyBooksScreen'
import ProposeTradeScreen from '../containers/ProposeTradeScreen'
import MyTradesScreen from '../containers/MyTradesScreen'
import TradeOffersScreen from '../containers/TradeOffersScreen'
import UserDetailsScreen from '../containers/UserDetailsScreen'


import NavBar from '../containers/NavBar'

module.exports = (
<Route path ="/" component={NavBar}>
	<IndexRoute component={SignInScreen} />
    <Route path="/signin" component={SignInScreen}/>
    <Route path="/signin/:urlUsername" component={SignInScreen}/>
    <Route path="/books" component={BooksScreen}/>
    <Route path="/mybooks" component={MyBooksScreen}/>
    <Route path="/propose-trade/:bookId" component={ProposeTradeScreen}/>
    <Route path="/mytrades" component={MyTradesScreen}/>
    <Route path="/trade-offers" component={TradeOffersScreen}/>
    <Route path="/user-details" component={UserDetailsScreen}/>
</Route>
)