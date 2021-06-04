const express = require('express');
const model_user = require('../../models/user');
const router = express.Router();

router.get('/', (req, res) => {
    model_user.getAllUser()
    .then((users) => {
        res.render('admin/user', {data: {user: users}, error: false});
    })
    .catch((error) => {
        res.render('admin/user', {data: {}, error: "Cannot get data"});
    })
});

module.exports = router;