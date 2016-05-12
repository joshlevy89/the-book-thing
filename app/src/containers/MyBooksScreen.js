import React, { Component } from 'react';
import { connect } from 'react-redux';
import { try_add_book  } from '../actions'
import BookList from '../components/BookList';
require('../../styles/index.scss');

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
    const { try_add_book, user } = this.props
    return (
         <div className="mainLayout" style = {{'margin-left':'10px'}}>
         <h2>My Books</h2>
         {user.mybooks.length!==0 ?
            <div><BookList booklist={user.mybooks} overlayType={'standard'} {...this.props}/></div>
            :<div style={{'marginLeft':'20px'}}>Search for books below</div>}
         <hr/>
         <div style={{'margin-bottom': '20px', 'margin-top':'20px'}}>
         <div>Search by title: </div>
         <input ref="titleInput" 
         onKeyDown={e=>this.handleTitleInputChange(e,this.refs.titleInput.value)}/>
         </div>
        <div>
         {this.state.booklist.map(book=>{
           if (book.volumeInfo.imageLinks === undefined) { return }
           return <a href='#' style={{'marginLeft': '10px', 'margin-top': '10px'}} key={book.id} onClick = {() => try_add_book(book,user)
           }><img src={book.volumeInfo.imageLinks.smallThumbnail} height='200px' width='140px'/></a>
         })}
         </div>
         </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        books: state.books
    }
}

MyBooksScreen = connect(
mapStateToProps,
{ try_add_book }
)(MyBooksScreen)
export default MyBooksScreen

