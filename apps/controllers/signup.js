const express = require('express');
const router = express.Router();
const model_user = require('../models/user');

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
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
        };

        // add userToAdd to database
        const result = model_user.addUser(userToAdd);

        if (!result)
            res.render('signup', {info: "Can not insert into database"});
        else 
            res.render('signup', {info: "Register sucess!"});
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