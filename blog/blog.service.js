const Blog = require('./blog');

function getForm(req, res) {
  res.render('blog');
}

function create(req, res) {
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
}

function getList(req, res) {
  Blog.find().then(blogs => {
    return res.render('blog-list', { blogs });
  });
}

module.exports = {
  create,
  getForm,
  getList
};
