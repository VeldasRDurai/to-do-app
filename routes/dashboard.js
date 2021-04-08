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
    // console.log("as");
    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    // console.log("bs"); 
    router.get('/' , async (req, res, next) => {
        // console.log(req.email);
        const userslist   = await obj.users.findOne({ email : req.email });
        const detailsList = await obj.details.findOne({ email : req.email });
        if (detailsList === null){
            res.render("dashboard.ejs",{ email:req.email , name:userslist.name , notes:[] });
            // res.json({ email:req.email , notes:[] });
        } else {
            res.render("dashboard.ejs", detailsList );
            // res.json(detailsList);
        }
    }); 

    return router;
}
