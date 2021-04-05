var express = require("express");
const path = require('path');
var router  = express.Router();

module.exports = ( obj ) => {
    const newNoteRouter = require("./new-note");
    const noteRouter   = require("./note");
       
    router.use('/new-note',express.static(path.join(__dirname, 'public')));
    router.use('/note',express.static(path.join(__dirname, 'public')));
     
    router.use('/new-note', newNoteRouter({ users:obj.users , details:obj.details }) );
    router.use('/note', noteRouter({ users:obj.users , details:obj.details }) );

    // dashboard 

    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users})); 
    router.get('/' , async (req, res, next) => {
        const detailsList = await obj.details.findOne({ username : req.username });
        if (detailsList === null){
            res.render("dashboard.ejs",{ username:req.username , notes:[] });
            // res.json({ username:req.username , notes:[] });
        } else {
            res.render("dashboard.ejs", detailsList );
            // res.json(detailsList);
        }
    }); 

    return router;
}
