const express = require('express');
const model_user = require('../../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user)
    {   
        model_user.getAllUser()
        .then((users) => {
            res.render('admin/user', {data: {user: users}, error: false});
        })
        .catch((error) => {
            res.render('admin/user', {data: {}, error: "Cannot get data"});
        });
    }
    else 
        res.redirect('/admin/login');
    
});

module.exports = router;