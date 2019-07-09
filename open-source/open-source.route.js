const express = require('express');
const router = express.Router();

const { forwardAuthenticated } = require('../config/auth');

router.get('/open-source', forwardAuthenticated, (req, res) =>
  res.render('open-source')
);

module.exports = router;
