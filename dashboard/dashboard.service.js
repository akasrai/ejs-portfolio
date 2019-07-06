function renderDashboard(req, res) {
  res.render('dashboard', {
    user: req.user
  });
}

module.exports = {
  renderDashboard
};
