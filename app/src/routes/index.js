import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'
import SignInScreen from '../containers/SignInScreen'

module.exports = (
<Route path ="/" component={SignInScreen}>
	<IndexRoute component={SignInScreen} />
    <Route path="/" component={SignInScreen}/>
</Route>
)