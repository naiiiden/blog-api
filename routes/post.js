const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hi from post');
});

module.exports = router;