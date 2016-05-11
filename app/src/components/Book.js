import React, { Component } from 'react';
import Overlay from './Overlay';
import { connect } from 'react-redux';
require('../../styles/Book.scss')

class Book extends Component {
   
    constructor(props) {
        super(props);
        this.state = { mouseHovering: false }
    }
    
    render() {
     const {entryId, books } = this.props
     // find entry for this book
     var entry = books.filter(book=>{
         return book._id === entryId
     })[0];
     return (
        <span style={{'margin-left':'5px', 'margin-right':'5px'}} className="entry">
            <span  
            onMouseEnter= {()=>{this.setState({mouseHovering: true})}}
            onMouseLeave= {()=>{this.setState({mouseHovering: false})}}
            >
                <img className="image" src={entry.book.book_info.volumeInfo.imageLinks.smallThumbnail} />
                {this.state.mouseHovering ? 
                (<span style={{position:'absolute',left:'0px',width:'140px',height:'200px',background:'lightGray',opacity:'.8'}}>
                   <Overlay entry={entry} {...this.props}/>
                </span>):(<span></span>)}
            </span>
        </span>
     )   
    }
}

export default Book


