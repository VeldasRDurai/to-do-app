var express = require("express");
var router  = express.Router();

module.exports = ( obj ) => {
    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.get('/' , async (req, res, next) => {
        const userslist   = await obj.users.findOne({ email : req.email });
        res.json({ email:userslist.email , name:userslist.name });
    }); 

    return router;
}
