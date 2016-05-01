import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'
import SignInScreen from '../containers/SignInScreen'
import BooksScreen from '../containers/BooksScreen'
import MyBooksScreen from '../containers/MyBooksScreen'
import NavBar from '../containers/NavBar'

module.exports = (
<Route path ="/" component={NavBar}>
	<IndexRoute component={SignInScreen} />
    <Route path="/signin" component={SignInScreen}/>
    <Route path="/books" component={BooksScreen}/>
    <Route path="/mybooks" component={MyBooksScreen}/>
</Route>
)