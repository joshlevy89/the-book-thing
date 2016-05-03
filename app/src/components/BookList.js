import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {
    render() {
        const { books, overlayType } = this.props
        return (
         <div>
         {books.map(entry=>{
            return (
              <Book key={entry._id} entry={entry} {...this.props}/>
            )
        })}  
        </div>
        )
    }
}

export default BookList