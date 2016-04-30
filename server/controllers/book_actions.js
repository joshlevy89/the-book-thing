function book_actions(app,db,io) {

this.get_all_books = function(req, res) {
    var allBooks = db.collection('allBooks')
    allBooks.find({}).toArray(function(err,docs){
       res.send({books: docs});
    })
    }
}

module.exports = book_actions