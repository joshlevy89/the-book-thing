function authenticate(app,io,socket,passport) {

this.twitter_authentication = passport.authenticate('twitter')

this.twitter_callback = app.get('/auth/return',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      //console.log("BEFORE CONNECTION")
      // io.on('connect', function(socket){
       //       console.log("IN CONNCECTIN")

       // console.log(req.user);
     // socket.emit('got_user_info', {user: req.user});
        //socket.disconnect(); // 
     //  });
    var username = encodeURIComponent(req.user.username);
    res.redirect('/signin/'+username);
    //res.redirect('/');
})

}

module.exports = authenticate