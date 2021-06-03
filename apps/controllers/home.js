const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.contentType("html");
    res.send("<h1>THIS IS HOME PAGE, USE localhost:3000/login</h1>");
});

module.exports = router;