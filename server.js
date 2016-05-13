process.env.PWD = process.cwd(); // for production

var express = require('express');
var app = express();
var database = require('./server/database/db.js')
var db = new database();
var routes = require('./server/routes/index.js');
var passport = require('passport');

var bodyParser = require('body-parser')
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');


var port = Number(process.env.PORT || 3000);

const isDevMode = (process.env.NODE_ENV !== 'production');

var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
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

app.use('/',express.static(publicPath));
var cors = require('cors')
app.use(cors());
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
var http = require('http').Server(app)
var io = require('socket.io')(http)


// We only want to run the workflow when not in production
if (!isProduction) {
  // Any requests to localhost:3000/build is proxied
  // to webpack-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

db.dbConnect(function(err,db_instance){
  io.on('connect', function(socket){
  // initialize routes
	routes(app, db_instance, io,socket,passport);   
  // default route that will catch non-index calls
  app.get('*', (req,res,next)=>{
    res.sendFile(publicPath+'/index.html');
  });
  });
})

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

http.listen(port, function () {
	console.log('Backend server listening at http://localhost:' + port);
})

