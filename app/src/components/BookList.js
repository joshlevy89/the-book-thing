import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {
    render() {
        const { booklist } = this.props
        return (
         <div>
         {booklist.map(entry=>{
            return (
              <Book key={entry._id} entryId={entry._id} {...this.props}/>
            )
        })}  
        </div>
        )
    }
}

export default BookList