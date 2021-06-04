const express = require('express');
const post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {

  // create data objects
  post.getAllPost().then(result => {
      const data = {
          posts: result,
          error: false
      };

      res.render('admin/dashboard', {data: data});
  }).catch(err => {
      res.render('admin/dashboard', {data: {error: err.message}})
  })
});

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/success', require('./success'));
router.use('/post/new', require('./admin/post/new'));
router.use('/post/edit', require('./admin/post/edit'));
router.use('/post/edit/:id', require('./admin/post/edit'));
router.use('/post/delete', require('./admin/post/delete'));
router.use('/user', require('./admin/user'));

module.exports = router;