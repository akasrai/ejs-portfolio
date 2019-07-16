const express = require('express');
const router = express.Router();
const {
  getAll,
  create,
  getList,
  getForm,
  getBySlug,
  checkIfExist
} = require('./blog.service');

const { ensureAuthenticated } = require('../config/auth');

router.get('/create', ensureAuthenticated, (req, res) => getForm(req, res));

router.post('/create', ensureAuthenticated, (req, res) => create(req, res));

router.get('/', (req, res) => getAll(req, res));

router.get('/list', ensureAuthenticated, (req, res) => getList(req, res));

router.get('/:slug', (req, res) => getBySlug(req, res));

router.get('/is-unique/:slug', ensureAuthenticated, (req, res) =>
  checkIfExist(req, res)
);

module.exports = router;
