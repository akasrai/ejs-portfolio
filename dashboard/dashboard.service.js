function renderDashboard(req, res) {
  res.render('dashboard', {
    user: req.user,
    layout: 'admin-layout'
  });
}

module.exports = {
  renderDashboard
};
