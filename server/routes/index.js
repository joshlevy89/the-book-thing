var Authentication = require('../controllers/authentication.js')
var Book_Actions = require('../controllers/book_actions.js')


module.exports = function(app, db, io) {
	var authentication = new Authentication(app,io)
	var book_actions = new Book_Actions(app,db,io)
	app.route('/auth/twitter')
		.get(authentication.twitter_authentication) 

	app.route('/auth/twitter/return')
		.get(authentication.twitter_callback)
		
	app.route('/get_all_books')
		.get(book_actions.get_all_books)
		
	app.route('/add_book')
		.post(book_actions.add_book)			
}