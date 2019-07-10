const User = require('./user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

function renderLoginForm(req, res) {
  res.render('login', { layout: 'admin-layout' });
}

function renderRegisterForm(req, res) {
  res.render('register', { layout: 'admin-layout' });
}

function create(req, res) {
  {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        layout: 'admin-layout'
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: 'admin-layout'
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  }
}

function login(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}

function logout(req, res, next) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
}

module.exports = {
  login,
  create,
  logout,
  renderLoginForm,
  renderRegisterForm
};
