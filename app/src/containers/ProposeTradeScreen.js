import React, { Component } from 'react'
import { connect } from 'react-redux';
import MyBooksScreen from './MyBooksScreen';
import BooksScreen from './BooksScreen';
import BookList from '../components/BookList';

class ProposeTradeScreen extends Component {
    
render() {
    const { books, mybooks } = this.props;
    var bookId = this.props.params.bookId;
    // get the book offered/requested
    var book = books.filter(book=> {
         return book._id===bookId 
    });
    // is the book in your library?
    var isBookInLibrary = mybooks.filter(book=> {
        return book._id===bookId
    }).length > 0;
    // determine books to choose from (for other side of trade)
    var booksToChooseFrom = [];
    if (isBookInLibrary) { // if in library, only show books outside user's libary
        booksToChooseFrom = books.filter(book=>{
            // check if the book is in mybooks; if not, return true
            return (mybooks.filter(mybook=> {
                return mybook._id===book._id
            }).length === 0);
        })
    }
    else { // if not in libary, only show books in user's libary
        booksToChooseFrom = mybooks;
    }
    return (
         <div>
         {isBookInLibrary ? <h2>Book Offered</h2>:<h2>Book Requested</h2>}
         <BookList books = {book} overlayType={'standard'}/>
         <h2>Select one of your books to trade</h2>
         <BookList books = {booksToChooseFrom} overlayType={'trade'}/>
         </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        mybooks: state.user.mybooks,
        books: state.books
    }
}

ProposeTradeScreen = connect(
mapStateToProps
)(ProposeTradeScreen)

export default ProposeTradeScreen