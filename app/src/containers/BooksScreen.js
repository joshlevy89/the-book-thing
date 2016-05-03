import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receive_all_books } from '../actions'
import BookList from '../components/BookList';

class BooksScreen extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        fetch('/get_all_books')
        .then(response => response.json())
      	.then(json => { 
            if (json.message === 'got_books_successfully') {
                dispatch(receive_all_books(json.books))
            }
          })
    }
    
    render() {
    const { books } = this.props
    return (
         <div>
            <h2>All Books</h2>
            <BookList books={books} overlayType={'standard'}/>
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    }
}

BooksScreen = connect(
mapStateToProps
)(BooksScreen)
export default BooksScreen

