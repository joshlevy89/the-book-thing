var Authentication = require('../controllers/authentication.js')
var Book_Actions = require('../controllers/book_actions.js')
var User = require('../controllers/user.js')



module.exports = function(app, db, io,socket,passport) {
	var authentication = new Authentication(app,io,socket,passport)
	var book_actions = new Book_Actions(app,db,io)
	var user = new User(app,db)

	app.route('/auth/twitter')
		.get(authentication.twitter_authentication) 

	app.route('/auth/twitter/return')
		.get(authentication.twitter_callback)

	//app.route('/profile')
	//	.get(authentication.twitter_profile)
		
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
		
	app.route('/accept_trade')
		.post(book_actions.accept_trade)	

	app.route('/update_user_details')
		.post(user.update_user_details)	

	app.route('/retrieve_user_details')
		.post(user.retrieve_user_details)		
}