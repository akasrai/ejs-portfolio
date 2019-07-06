const express = require('express');
const router = express.Router();
const { renderHomePage } = require('./home.service');
const { forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => renderHomePage(req, res));

module.exports = router;
