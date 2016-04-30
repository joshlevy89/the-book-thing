import React, { Component } from 'react';
import { connect } from 'react-redux';

class BooksScreen extends Component {
    componentDidMount() {
        fetch('/get_all_books')
        .then(response => response.json())
      	.then(json => { 
            console.log(json);
          }
         )
    }
    
    render() {
    return (
         <div>
          Books Screen
         </div>
        )
    }
}

BooksScreen = connect()(BooksScreen)
export default BooksScreen

