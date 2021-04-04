var express = require("express");
// const path  = require('path');
var router  = express.Router();

module.exports = ( obj ) => {
    
    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.post( '/' , async (req, res, next) => {
        const user = await obj.details.findOne({username:req.username});
        await obj.details.updateOne( {username:req.username} , {
            notes : [ ...user.notes , req.body ]
        });
        res.send();
    });

    return router;
}
