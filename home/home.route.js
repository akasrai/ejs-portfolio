const express = require('express');
const router = express.Router();
const { renderHomePage } = require('./home.service');

router.get('/', (req, res) => renderHomePage(req, res));

module.exports = router;
