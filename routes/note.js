var express = require("express");
const path  = require('path');
var router  = express.Router();
const ObjectID = require('mongoose').mongo.ObjectID;

module.exports = ( obj ) => {
    const updateRouter = require("./update");

    router.use('/update',express.static(path.join(__dirname, 'public')));

    router.use('/update', updateRouter({ users:obj.users , details:obj.details }) );

    //  => dashboard/note

    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.post( '/' , async (req, res, next) => {
        const userlist = await obj.details.findOne({ email : req.email });
        const note = userlist.notes.find( (item) => {
            // console.log(JSON.stringify(item._id).trim() +" : "+ typeof(JSON.stringify(item._id)) );
            // console.log(JSON.stringify(req.body._id).slice(0) +" : "+ typeof(JSON.stringify(req.body._id)) );

            return JSON.stringify(item._id).trim() === JSON.stringify(req.body._id).trim() ; 
        });
        // console.log(note);
        res.json(note);
    });

    return router;
}
