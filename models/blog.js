const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
