const router = express.Router();
const express = require('express');

const Blog = require('../models/blog');
const { ensureAuthenticated } = require('../config/auth');

router.get('/blog/create', ensureAuthenticated, (req, res) =>
  res.render('blog')
);

module.exports = router;
