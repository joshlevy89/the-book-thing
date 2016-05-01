export function update_user_info(user,mybooks){
    return {
        type: 'UPDATE_USER_INFO',
        user: user
    }
}

export function receive_all_books(books) {
    return {
        type: 'RECEIVE_ALL_BOOKS',
        books: books
    }
}

export function receive_my_books(books) {
    return (dispatch) => {
        dispatch({
            type: 'RECEIVE_MY_BOOKS',
            mybooks: books
        })
    }
}

export function try_add_book(book,user) {
    return (dispatch,getState) => {
        // prevent addition if user not logged in
        if (Object.keys(getState().user.user_info).length === 0) {
            alert('Must be logged in to add a book!');
            return;
        }
        const body = {
            book: book,
            user: user
        }
        fetch('/add_book', {
			method: 'post',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		    },
			body: JSON.stringify(body)
		})
        .then(response => response.json())
      	.then(json => {
            if (json.message === 'book_added_successfully') {
            dispatch({
                type:'ADD_BOOK',
                book: json.book
            })
            }
         })
    }
}