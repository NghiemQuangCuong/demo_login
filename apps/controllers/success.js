const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.contentType('text/plain');
    res.send("Login success");
})

module.exports = router;