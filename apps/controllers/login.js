const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("login");
});

router.post('/', (req, res) => {
    const user = req.body;

    if (user.email.trim().length === 0)
    {
        return res.render("login", {"error": "Email is empty"});
    }
    if (user.passwd.trim().length === 0)
    {
        return res.render("login", {"error": "Password is empty"});
    }
    if (user.firstname.trim().length === 0)
    {
        return res.render("login", {"error": "First name is empty"});
    }

});

module.exports = router;