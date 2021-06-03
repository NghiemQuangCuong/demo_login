const express = require('express');
const router = express.Router();

router.get('/', require("./home"));
router.use('/login', require("./login"));
router.use('/signup', require("./signup.js"));
router.use('/success', require('./success'));

module.exports = router;