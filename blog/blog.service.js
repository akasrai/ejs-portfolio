const Blog = require('./blog');
var moment = require('moment');
const { getExcerpt } = require('../utils/common-helper');

function getForm(req, res) {
  res.render('blog-create', { layout: 'admin-layout' });
}

function create(req, res) {
  const { title, slug, description } = req.body;
  let errors = {};

  if (!title) {
    errors.title = 'Please enter title';
  }

  if (Object.keys(errors).length) {
    return res.render('blog-create', {
      errors,
      title,
      slug,
      description,
      layout: 'admin-layout'
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
}

function getList(req, res) {
  Blog.find().then(a => {
    const blogs = a.map(blog => {
      return {
        ...blog._doc,
        excerpt: getExcerpt(blog.description, 300),
        createdOn: moment(blog.createdOn).format('MMM Do YYYY')
      };
    });

    return res.render('blog-list', { layout: 'public-layout', blogs });
  });
}

function getBySlug(req, res) {
  const slug = req.params.slug;

  Blog.find({ slug: slug }).then(blogs => {
    const blog = {
      ...blogs[0]._doc,
      createdOn: moment(blogs[0].createdOn).format('MMM Do YYYY')
    };

    return res.render('blog-view', { layout: 'public-layout', blog });
  });
}

async function checkIfExist(req, res) {
  const slug = req.params.slug;
  let isUnique = await Blog.find({ slug: slug }).then(blogs => {
    if (blogs.length) return false;

    return true;
  });

  console.log(isUnique);
  return res.json({ isUnique });
}

module.exports = {
  create,
  getForm,
  getList,
  getBySlug,
  checkIfExist
};
