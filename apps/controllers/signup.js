const express = require('express');
const model_user = require('../models/user');
const helpers = require('../helpers/helpers');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', (req, res) => {
    const user = req.body;

    if (checkLegal(user, res))
    {
        // user is legal then construct userToAdd match database
        const userToAdd = {
            email: user.email,
            password: helpers.hashPassword(user.password),
            first_name: user.first_name,
            last_name: user.last_name,
        };

        // add userToAdd to database
        model_user.addUser(userToAdd).then((data) => {
            res.redirect('/admin/login');
        }).catch((err) => {
            res.render('signup', {info: "Can not insert into database"});
        });
    }

    return;
});

function checkLegal(user, res)
{
    if (user.first_name.trim().length == 0)
    {
        res.render('signup', {info: "First Name must not be empty"});
        return false;
    }
    
    if (user.email.trim().length == 0)
    {
        res.render('signup', {info: "Email must not be empty"});
        return false;
    }

    if (user.password.trim().length == 0)
    {
        res.render('signup', {info: "You must enter password"});
        return false;
    }

    if (user.repassword.trim().length == 0)
    {
        res.render('signup', {info: "You must confirm password"});
        return false;
    }
        
   if (user.password != user.repassword)
   {
        res.render('signup', {info: "Password not match"});
        return false;
   }

    return true;
}

module.exports = router;