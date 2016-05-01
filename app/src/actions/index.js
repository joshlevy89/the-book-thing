export function update_login(user){
    return {
        type: 'UPDATE_LOGIN',
        user: user
    }
}

export function receive_all_books(books) {
    return {
        type: 'RECEIVE_ALL_BOOKS',
        books: books
    }
}

export function try_add_book(book,user) {
    return (dispatch) => {
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