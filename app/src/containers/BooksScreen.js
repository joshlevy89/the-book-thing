import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookList from '../components/BookList';
require('../../styles/index.scss')


class BooksScreen extends Component {
    
    render() {
    const { books } = this.props
    return (
         <div style = {{'marginLeft':'10px'}} className="mainLayout">
            <h2>All Books</h2>
            {books.length===0 ? 
            <div style={{'marginLeft': '20px'}} className="mainLayout">
            No books have been uploaded yet</div>:
            <div></div>
            }
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

