import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookList from '../components/BookList';
require('../../styles/index.scss')


class BooksScreen extends Component {
    
    render() {
    const { books } = this.props
    return (
         <div style = {{'margin-left':'10px'}} className="mainLayout">
            <h2>All Books</h2>
            <BookList booklist={books} {...this.props} overlayType={'standard'}/>
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books,
        user: state.user
    }
}

BooksScreen = connect(
mapStateToProps
)(BooksScreen)
export default BooksScreen

