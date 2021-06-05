const express = require('express');
const model_post = require('../../../models/post');
const router = express.Router();

router.delete('/', (req, res) => {
    const id = req.body;
    
    model_post.deletePostById(id.id)
    .then((result) => {
        res.json({statusCode: 200});
    })
    .catch((error) => {
        res.json({statusCode: 500});
        console.log(error.message);
    });
});

module.exports = router;