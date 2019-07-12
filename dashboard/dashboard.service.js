function renderDashboard(req, res) {
  console.log(req.isAuthenticated());
  res.render('dashboard', {
    user: req.user,
    layout: 'admin-layout'
  });
}

module.exports = {
  renderDashboard
};
