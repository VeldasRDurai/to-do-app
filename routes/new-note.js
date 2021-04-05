var express = require("express");
// const path  = require('path');
var router  = express.Router();

module.exports = ( obj ) => {

    // => dashboard/new-note

    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.get( '/' , async (req, res, next) => {
        const untitledNote = {
            time     : new Date() ,
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
        const userlist2 = await obj.details.findOne({ username : req.username });
        const newNote = await userlist2.notes.find( (item) => {
            return item.time.getTime() === untitledNote.time.getTime();
        });
        res.json( newNote );
    });

    return router;
}
