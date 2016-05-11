import React, { Component } from 'react'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux' 
require('../../styles/index.scss')


class NavBar extends Component{
  render() {
    const { dispatch } = this.props
    return (
    <div>
    <Navbar>
    	<Navbar.Header>
	      	<Navbar.Brand>
	        	<a>The Book Thing</a>
	      	</Navbar.Brand>
   		</Navbar.Header>
	    <Nav>
	      	<NavItem onClick = {()=>browserHistory.push('/signin')} >Sign In</NavItem>
	      	<NavItem onClick = {()=>browserHistory.push('/books')} >Books</NavItem>
					<NavItem onClick = {()=>browserHistory.push('/mybooks')} >My Books</NavItem>
				  <NavItem onClick = {()=>browserHistory.push('/mytrades')} >Proposed Trades</NavItem>
					<NavItem onClick = {()=>browserHistory.push('/trade-offers')} >Trade Offers</NavItem>
					<NavItem onClick = {()=>browserHistory.push('/user-details')}>Profile</NavItem>
	    </Nav>
  	</Navbar>
  	        {this.props.children}
  	</div>
    );
  }
};

NavBar = connect()(NavBar)

export default NavBar
