const express = require('express');
const post = require('../models/post');
const router = express.Router();

router.get('/', (req, res) => {
    post.getAllPost()
    .then((result) => {

        result.forEach(post => {
            if (post.content.length > 50)
                post.subtitle = post.content.substring(0, 50).concat(' ...');
            else 
                post.subtitle = post.content;

            post.created_at = dateObjectToString(post.created_at);
        });

        const data = {
            posts: result,
            error: false
        }

        res.render('blog/blog', data);
    })
    .catch((error) => {
        const data = {
            error: "Can not get posts"
        }

        res.render('blog/blog', {data: data});
        console.log(error.message);
    })
});

router.get('/about', (req, res) => {
    res.render('blog/about');
})

router.get('/post/:id', (req, res) => {
    const id = req.params.id;

    post.getPostById({id: id})
    .then((result) => {

        result.forEach(post => {
            post.created_at = dateObjectToString(post.created_at);
        })

        const data = {
            post: result[0],
            error: false
        };

        console.log(data);
        res.render('blog/post', data);
    })
    .catch((error) => {
        res.render('blog/post');
        console.log(error.message);
    })
});

function dateObjectToString(obj)
{
    return obj.toString().substring(0, obj.toString().indexOf('GMT') - 1);
}

module.exports = router;