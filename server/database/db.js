function db() {

	var db_singleton = null;

	this.dbConnect = function(cb) {
	  if (this.db_singleton) {
		cb(err,db)
		return
	  }
	  else {
	  	var isProduction = process.env.NODE_ENV === 'production';
	  	if (isProduction) {
	  		var url = 'mongodb://joshlevy89:Born=1989@ds019472.mlab.com:19472/heroku_7xdw2lfc';
	    }
	    else {
            var url = 'mongodb://localhost:27017/the-book-thing';
		}
		var mongo = require('mongodb').MongoClient;
		mongo.connect(url, function(err,db) {
			db_singleton = db;
			cb(err, db);
			return
		})
	  }
	}
}

module.exports = db;