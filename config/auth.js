module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.isLogedIn = req.isAuthenticated();
      res.locals.user = req.user;

      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.locals.isLogedIn = req.isAuthenticated();

      return next();
    }
    res.redirect('/auth/dashboard');
  }
};
