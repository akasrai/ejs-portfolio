const {
  login,
  create,
  logout,
  getLoginForm,
  getRegisterForm
} = require('./user.service');

const express = require('express');
const router = express.Router();

const { forwardAuthenticated } = require('../config/auth');

router.get('/login', forwardAuthenticated, (req, res) =>
  getLoginForm(req, res)
);

router.get('/register', forwardAuthenticated, (req, res) =>
  getRegisterForm(req, res)
);

router.post('/register', (req, res) => create(req, res));

router.post('/login', (req, res, next) => login(req, res, next));

router.get('/logout', (req, res) => logout(req, res));

module.exports = router;
