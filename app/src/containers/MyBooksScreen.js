import React, { Component } from 'react';
import { connect } from 'react-redux';
import { try_add_book, receive_my_books } from '../actions'

class MyBooksScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { booklist: [] }
    }
    
    componentDidMount() {
        const { receive_my_books, user } = this.props
        const body = {
            user: user
        }
        fetch('/get_my_books', {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		})
        .then(response => response.json())
      	.then(json => { 
            if (json.message === 'got_mybooks_successfully') {
                receive_my_books(json.books)
            }
          })
    }
  
    handleTitleInputChange(e,val) {
        var url = 'https://www.googleapis.com/books/v1/volumes?q=';
        if (e.keyCode === 13) {
           fetch(url + val + '+intitle')
            .then(response => response.json())
            .then(json => { 
                this.setState({
                    booklist: json.items
                })
            })
        }
    }
    
    render() {
    const { try_add_book, user, mybooks} = this.props
    return (
         <div>
         <h2>My Books</h2>
         {mybooks.map(entry=>{
           return (<span key={entry._id}>
                    <img src={entry.book.book_info.volumeInfo.imageLinks.smallThumbnail} height='200px' width='140px'/>
                  </span>)
         })}
         <div>Search by title: </div>
         <input ref="titleInput" 
         onKeyDown={e=>this.handleTitleInputChange(e,this.refs.titleInput.value)}/>
         <div>
         {this.state.booklist.map(book=>{
           return <span key={book.id} onClick = {() => try_add_book(book,user)
           }><img src={book.volumeInfo.imageLinks.smallThumbnail} height='200px' width='140px'/></span>
         })}
         </div>
         </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        mybooks: state.user.mybooks
    }
}

MyBooksScreen = connect(
mapStateToProps,
{ try_add_book, receive_my_books }
)(MyBooksScreen)
export default MyBooksScreen

