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
            var url = 'PRODUCTION DBNAME HERE!';
	    }
	    else {
            var url = 'mongodb://localhost:27017/DBNAME';
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