const e = require('express');
const express = require('express');
const model_post = require('../../../models/post');
const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    if (req.session.user)
    {
        const requestParams = req.params;

        if (requestParams == {})
            res.render('admin/post/dashboard');

        const data = model_post.getPostById(requestParams);

        if (data) 
        {
            data.then((result) => {
                const post = result[0];

                res.render('admin/post/edit.handlebars', {data: {post: post}});
            }).catch((err) => {
                res.render('admin');
                console.log(err.message);
            })
        }
        else 
        {
            res.render('admin/post/dashboard');
            console.log('loi bat thuong controllers/admin/post/edit.js:22');
        }
    }
    else 
        res.redirect('/admin/login');
});

router.put('/', (req, res) => {
    const requestBody = req.body;

    if (requestBody.title.trim().length == 0)
    {
        res.json({statusCode: 500, error: "Title must not empty"});
    }
    else
    {
        model_post.updatePost(requestBody)
        .then((result) => {
            // log ve ket qua query update
            res.json({statusCode: 200});
        })
        .catch((error) => {
            // loi
            console.log('error in controllers/admin/post/edit.js:37, err: ' + error.message);
        });
    }
});

module.exports = router;