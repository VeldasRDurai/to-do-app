var express = require("express");
const path  = require('path');
var router  = express.Router();

module.exports = ( obj ) => {
    const updateRouter = require("./update");

    router.use('/update',express.static(path.join(__dirname, 'public')));

    router.use('/update', updateRouter({ users:obj.users , details:obj.details }) );

    //  => dashboard/note

    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.post( '/' , async (req, res, next) => {
        const userlist = await obj.details.findOne({ username : req.username });
        const note = userlist.notes.find( (item) => {
            return Math.floor(new Date(item.id).getTime() / 1000) === Math.floor( req.body.id / 1000) ;
        });
        res.json(note);
    });

    return router;
}
