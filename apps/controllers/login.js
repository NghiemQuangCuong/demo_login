const express = require('express');
const helpers = require('../helpers/helpers');
const model_user = require('../models/user');


const router = express.Router();

router.get('/', (req, res) => {
    res.render("login");
});

router.post('/', (req, res) => {
    const params = req.body;

    if (params.email.trim().length == 0)
    {
        res.render('login', {info: "Chua nhap ten dang nhap kia` >.<"});
        return false;
    }

    if (params.password.trim().length == 0)
    {
        res.render('login', {info: "Chua nhap mat khau kia` >.<"});
        return false;
    }

    // check if username is in database
    const data = model_user.findUserByEmail(params.email);

    data.then((data) => {
        // lay gia tri dau tien trong chuoi ket qua tra ve tu db
        const user = data[0];

        const status = helpers.comparePassword(params.password, user.password);
        if (!status)
        {
            res.render('login', {info: "Sai mat khau rui >.<"});
        }
        else 
        {
            req.session.user = user.email;
            res.redirect('/admin');
        }
    }).catch((err) => {
        res.render('login', {info: "Khong co user, tao moi di nek >.<"});
    })
    
});

module.exports = router;