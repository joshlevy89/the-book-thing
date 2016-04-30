var Authentication = require('../controllers/authentication.js')

module.exports = function(app, db, io) {
	var authentication = new Authentication(app,io)
	app.route('/auth/twitter')
		.get(authentication.twitter_authentication) 

	app.route('/auth/twitter/return')
		.get(authentication.twitter_callback)
		
	app.route('/profile')
		.get(authentication.twitter_profile)
}