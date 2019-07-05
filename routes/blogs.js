const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/create', ensureAuthenticated, (req, res) => res.render('blog'));

router.post('/create', (req, res) => {
  const { title, slug, description } = req.body;
  let errors = {};

  if (!slug) {
    errors.slug = 'Please enter slug';
  }

  if (!title) {
    errors.title = 'Please enter slug';
  }

  if (Object.keys(errors).length) {
    return res.render('blog', {
      errors,
      title,
      slug,
      description
    });
  }

  const newBlog = new Blog({
    title,
    slug,
    description
  });

  newBlog
    .save()
    .then(blog => {
      req.flash('success_msg', 'Blog posted successfully');
      res.redirect('/blog/create');
    })
    .catch(err => console.log(err));
});

router.get('/list', forwardAuthenticated, (req, res) => {
  Blog.find().then(blogs => {
    return res.render('blog-list', { blogs });
  });
});

module.exports = router;
