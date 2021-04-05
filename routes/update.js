var express = require("express");
var router  = express.Router();

module.exports = ( obj ) => {
    
    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.post( '/' , async (req, res, next) => {
        console.log(req.body._id);
        await obj.details.updateOne( {'username':req.username , 'notes._id': req.body._id } , 
            { $set : { 'notes.$.heading' : req.body.heading , 'notes.$.content' : req.body.content } }
        );
        res.send();
    });

    return router;
}
