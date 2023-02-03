const express = require('express')
const { 
  getPost, 
  getPosts, 
  editPost, 
  deletePost, 
  addPost, 
}  = require  ('../controllers/api-post-controller')

const router = express.Router()

// Get All Posts
router.get('/api/posts', getPosts)

// Add Post
router.post('api/post', addPost)

// Get Post by ID
router.get('/posts/:id', getPost)

// Update Post by ID
router.put('/edit/:id', editPost)

// Delete Post by ID
router.delete('/posts/:id', deletePost)


module.exports = router