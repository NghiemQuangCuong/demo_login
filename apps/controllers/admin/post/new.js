const express = require('express');
const post = require('../../../models/post');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user)
    {
        res.render('admin/post/new', {data: 
            {error: false}
        });
    }
    else 
        res.redirect('/admin/login');
    
});

router.post('/', (req, res) => {
    const requestBody = req.body;

    if (requestBody.title.trim().length == 0)
        res.render('admin/post/new', {data: {error: true, error_mes: "Please enter title"}});
    else if (requestBody.content.trim().length < 21)
        res.render('admin/post/new', {data: {error: true, error_mes: "Content must contains at least 20 characters"}});
    else if (requestBody.author.trim().length == 0)
        res.render('admin/post/new', {data: {error: true, error_mes: "Please enter author"}})
    else 
    {
        const data = {
            title: requestBody.title,
            content: requestBody.content,
            author: requestBody.author,
            created_at: new Date(),
            updated_at: new Date()
        }
        
        post.addPost(data).then((result) => {
            res.redirect('/admin');
        }).catch((err) => {
            res.render('admin/post/new', {data: {error: err.message}});
        });
    }
    
});

module.exports = router;