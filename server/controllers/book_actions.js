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
    
    this.get_my_trades = function(req, res) {
        var username = req.body.user.username;        
        var allTrades = db.collection('allTrades')
        allTrades.find({"trade.user_info.username":username}).toArray(function(err,docs){
        res.json({
            message: 'got_mytrades_successfully',
            trades: docs
        });
        })
    }
    
    this.get_trade_offers = function(req, res) {
        var username = req.body.user.username;        
        var allTrades = db.collection('allTrades')
        allTrades.find({"trade.otherUser.username":username}).toArray(function(err,docs){
        res.json({
            message: 'got_trade_offers_successfully',
            trades: docs
        });
        })
    }
    
    this.add_trade = function(req,res) {
        var allTrades = db.collection('allTrades');
        var trade_info = req.body.trade;
        var user_info = req.body.user.user_info;
        var otherUser = req.body.otherUser;
        var bookIdOfProposer = req.body.bookIdOfProposer;
        var trade = {
            trade_info: trade_info,
            user_info: user_info,
            otherUser: otherUser,
            bookIdOfProposer: bookIdOfProposer
        }
       allTrades.insert({trade: trade}, function (err,doc){
            io.sockets.emit('trade_added', {
                 message: 'trade_added_successfully',
                 trade: doc.ops[0]
            })
            res.end();
        });
    }
    
    this.delete_trade = function(req,res) {
        var allTrades = db.collection('allTrades');
        var trade = req.body.trade;
        var tradeId = trade._id;
        var ObjectId = require('mongodb').ObjectID;
       allTrades.remove({'_id': ObjectId(tradeId)}, function (err,doc){
            io.sockets.emit('trade_deleted', {
                 message: 'trade_deleted_successfully',
                 trade: trade
            })
            res.end();
        });
    }
    
   this.accept_trade = function(req,res) {
        var allTrades = db.collection('allTrades');
        var trade = req.body.trade;
        var user = req.body.user;
        var tradeId = req.body.trade._id;
        var atrade = trade.trade;
        var ObjectId = require('mongodb').ObjectID;
        // swap the books
        var allBooks = db.collection('allBooks')
        var firstItem = atrade.trade_info.firstItem;
        var secondItem = atrade.trade_info.secondItem;
        var bookIdOfProposer = atrade.bookIdOfProposer;
        var ownerUserInfo = atrade.user_info;
        var otherUserInfo = atrade.otherUser;
        // does the first item belong to the proposer?
        var userOwnsFirstItem = bookIdOfProposer === firstItem;
        if (userOwnsFirstItem) {
            // find the book with the firstItem id and give it the otherUser info
            allBooks.update({'_id':ObjectId(firstItem)},{
                $set: {
                    'book.user_info': otherUserInfo
                }
            })
            // find the book with secondItem id and give it the owner's info
            allBooks.update({'_id':ObjectId(secondItem)},{
                $set: {
                    'book.user_info': ownerUserInfo
                }
            }, function(err,docs){
                 io.sockets.emit('trade_accepted',{
                    user: user
                 });
            })
        }
        else {
             // find the book with the secondItem id and give it the otherUser info
               allBooks.update({'_id':ObjectId(secondItem)},{
                $set: {
                    'book.user_info': otherUserInfo
                }
            })
            // find the book with firstItem id and give it the owner's info
            allBooks.update({'_id':ObjectId(firstItem)},{
                $set: {
                    'book.user_info': ownerUserInfo
                }
            }, function(err,docs){
                 io.sockets.emit('trade_accepted',{
                    user: user
                 });
            })
        }
        
        // delete all other trades involving either of these books
        allTrades.remove({'trade.trade_info.firstItem': firstItem});
        allTrades.remove({'trade.trade_info.firstItem': secondItem});
        allTrades.remove({'trade.trade_info.secondItem': secondItem});
        allTrades.remove({'trade.trade_info.secondItem': firstItem});
        res.end();

        
        // delete trade (would like to just reference the 
        // already existent function but can't figure out syntax)
    //    var tradeId = trade._id;
    //    allTrades.remove({'_id': ObjectId(tradeId)}, function (err,doc){
    //         io.sockets.emit('trade_deleted', {
    //              message: 'trade_deleted_successfully',
    //              trade: trade
    //         })
    //         res.end();
    //     });
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
            io.sockets.emit('book_added', {
                 message: 'book_added_successfully',
                 book: doc.ops[0]
            })
            res.end();
        });
    }
}


module.exports = book_actions