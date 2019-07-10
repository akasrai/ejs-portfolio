const express = require('express');
const router = express.Router();

router.get('/open-source', (req, res) =>
  res.render('open-source', { layout: 'public-layout' })
);

module.exports = router;
