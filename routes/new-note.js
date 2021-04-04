var express = require("express");
// const path  = require('path');
var router  = express.Router();

module.exports = ( obj ) => {

    // => dashboard/new-note

    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.get( '/' , async (req, res, next) => {
        const untitledNote = {
            id     : new Date().getTime() ,
            heading: "Untitled" ,
            content: "Write something here..."
        }
        const userlist = await obj.details.findOne({ username : req.username });
        if (userlist === null){
            await obj.details({ username : req.username }).save();
        }
        await obj.details.updateOne( {username:req.username} , 
            { $push : {  notes : untitledNote } } 
        );

        res.json( { username:req.username , note: untitledNote } );
        // res.render( "note.ejs", { username:req.username ,  });
    });

    return router;
}
