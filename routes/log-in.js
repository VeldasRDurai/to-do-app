var express = require("express");
var router  = express.Router();

router.get( '/' , (req, res, next) => {
    res.render("log-in.ejs");
});
router.post( '/' , (req, res, next) => {
    console.log( req.body );
    res.sendStatus(200);
});

module.exports = router;