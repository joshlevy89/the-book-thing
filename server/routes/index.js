var Authentication = require('../controllers/authentication.js')

module.exports = function(app, db, io) {
	var authentication = new Authentication(app)
	app.route('/auth/twitter')
		.get(authentication.twitter_authentication) 

	app.route('/auth/twitter/return')
		.get(authentication.twitter_callback)

}