const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
     if (!req.session.user)
         return res.redirect(303, '/admin/login');

    res.render('chat', {user_email: req.session.user});
});

module.exports = router;
