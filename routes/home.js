var express = require("express");
var router  = express.Router();

router.get( '/' , (req, res, next) => {
    // res.sendFile("html/home.html", { root: 'public' });
    res.render("home.ejs");
});

module.exports = router;