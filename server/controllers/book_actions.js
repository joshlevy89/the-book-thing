function book_actions(app,db,io) {

   this.get_all_books = function(req, res) {
        var allBooks = db.collection('allBooks')
        allBooks.find({}).toArray(function(err,docs){
        res.json({
            message: 'got_books_successfully',
            books: docs
        });
        })
    }
    
    this.get_my_books = function(req, res) {
        var username = req.body.user.username;        
        var allBooks = db.collection('allBooks')
        allBooks.find({"book.user_info.username":username}).toArray(function(err,docs){
        res.json({
            message: 'got_mybooks_successfully',
            books: docs
        });
        })
    }

    this.add_book = function(req,res) {
        var allBooks = db.collection('allBooks');
        var book_info = req.body.book;
        var user_info = req.body.user.user_info;
        var book = {
            book_info: book_info,
            user_info: user_info
        }
        allBooks.insert({book: book}, function (err,doc){
            res.json({
                message: 'book_added_successfully',
                book: doc.ops[0]
            });
        });
    }
}


module.exports = book_actions