function authenticate(app,io) {

var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

app.use(passport.initialize());
app.use(passport.session());

var isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  var credentials = {
    consumerKey: "4Ohc3xVuGnz6JKG6T6hpTuQZa",
    consumerSecret: "rcplpTLAh42rpZsb2KguQ4Co0QmGQg7DGHqotVwditRl1yLAv4"
  }
}
else {
  var credentials = {
    consumerKey: "KuPv371J1Wvg3oYqPZpdBpV7t",
    consumerSecret: "9ByRm6bWWUIwFMoE1TKj35Q8o5WuMzmXyyiluGHDdNiFOCBQtH",
  }
}

// Configure the Twitter strategy for use by Passport.
passport.use(new Strategy({
    consumerKey: credentials.consumerKey,
    consumerSecret: credentials.consumerSecret,
    callbackURL: '/auth/return'
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


this.twitter_authentication = passport.authenticate('twitter')

this.twitter_callback = app.get('/auth/return',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
       io.on('connect', function(socket){
        socket.emit('got_user_info', {user: req.user});
        //socket.disconnect(); // 
       });
       res.redirect('/');
})
}

module.exports = authenticate