var express = require("express");
var router  = express.Router();

router.get( '/' , (req, res, next) => {
    res.render("log-in.ejs");
});

module.exports = router;