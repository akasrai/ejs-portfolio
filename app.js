const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Dot env congig
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// CSS
app.use(express.static(__dirname + '/public'));

// EJS
// add views folder from each module here
app.use(expressLayouts);
app.set('views', [
  __dirname + '/component',
  __dirname + '/blog/views',
  __dirname + '/user/views',
  __dirname + '/home/views',
  __dirname + '/dashboard/views',
  __dirname + '/open-source/views'
]);
app.set('view engine', 'ejs');
app.set('view options', { layout: false });

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./home/home.route'));
app.use('/auth', require('./dashboard/dashboard.route'));
app.use('/users', require('./user/user.route'));
app.use('/blog', require('./blog/blog.route'));
app.use('/work', require('./open-source/open-source.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
