import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receive_all_books } from '../actions'

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
            {books.map(entry=>{
                return (
                <span key={entry._id}>
                    <img src={entry.book.book_info.volumeInfo.imageLinks.smallThumbnail} height='200px' width='140px'/>
                </span>
                )
            })}
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

