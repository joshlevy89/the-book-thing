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
		
	app.route('/get_my_books')
		.post(book_actions.get_my_books)
		
	app.route('/add_book')
		.post(book_actions.add_book)
		
	app.route('/get_my_trades')
		.post(book_actions.get_my_trades)
		
	app.route('/get_trade_offers')
		.post(book_actions.get_trade_offers)
		
	app.route('/add_trade')
		.post(book_actions.add_trade)	
		
	app.route('/delete_trade')
		.post(book_actions.delete_trade)		
}