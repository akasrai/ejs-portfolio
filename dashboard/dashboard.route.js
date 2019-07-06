const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { renderDashboard } = require('./dashboard.service');

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  renderDashboard(req, res)
);

module.exports = router;
