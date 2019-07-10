const express = require('express');
const router = express.Router();
const { getForm, create, getList, getBySlug } = require('./blog.service');

const { ensureAuthenticated } = require('../config/auth');

router.get('/create', ensureAuthenticated, (req, res) => getForm(req, res));

router.post('/create', ensureAuthenticated, (req, res) => create(req, res));

router.get('/list', (req, res) => getList(req, res));

router.get('/:slug', (req, res) => getBySlug(req, res));

module.exports = router;
