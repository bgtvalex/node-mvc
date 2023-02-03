const Post = require('../models/post')
const createPath = require('../helpers/create-path')

const handleError = (res, err) => {
  console.log(err)
  res.render(createPath('error'), {title: 'error16' })
}

const getPost = (req, res) => {
  const title = 'post'
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('post'), { title, post }))
    .catch(err => handleError(res, err))
}

const getPosts = (req, res) => {
  const title = 'post'
  Post
    .find()
    .sort({ createdAt: -1})
    .then(posts => res.render(createPath('posts'), { title, posts }))
    .catch(err => handleError(res, err))
}

const getEditPost = (req, res) => {
  const title = 'edit post'
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { title, post }))
    .catch(err => handleError(res, err))
}

const editPost = (req, res) => {
  const { title, author, text } = req.body
  const { id } = req.params
  Post
    .findByIdAndUpdate(id, { title, author, text })
    .then(result => res.redirect(`/posts/${id}`))
    .catch(err => handleError(res, err))
}

const deletePost = (req, res) => {
  const title = 'post'
  Post
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200)
    })
    .catch(err => handleError(res, err))
}

const addPost = (req, res) => {
  const { title, author, text } = req.body
  const post = new Post({ title, author, text })
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch(err => handleError(res, err))
}

const getAddPost = (req, res) => {
  const title = 'add-post'
  res.render(createPath('add-post'), { title })
}


module.exports = {
  getPost,
  getPosts,
  getEditPost,
  editPost,
  deletePost,
  addPost,
  getAddPost
}