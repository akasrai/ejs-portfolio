function renderHomePage(req, res) {
  return res.render('welcome', { layout: 'public-layout' });
}

module.exports = {
  renderHomePage
};
