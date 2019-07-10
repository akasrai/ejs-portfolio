const express = require('express');
const router = express.Router();
const { getForm, create, getList, getBySlug } = require('./blog.service');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/create', forwardAuthenticated, (req, res) => getForm(req, res));

router.post('/create', forwardAuthenticated, (req, res) => create(req, res));

router.get('/list', forwardAuthenticated, (req, res) => getList(req, res));

router.get('/:slug', forwardAuthenticated, (req, res) => getBySlug(req, res));

module.exports = router;
