import React, { Component } from 'react';
import { connect } from 'react-redux';
import { try_add_book  } from '../actions'
import BookList from '../components/BookList';

class MyBooksScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = { booklist: [] }
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
         <BookList books={mybooks} overlayType={'standard'}/>
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
{ try_add_book }
)(MyBooksScreen)
export default MyBooksScreen

