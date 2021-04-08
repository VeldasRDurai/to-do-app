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
        const userlist  = await obj.users.findOne({ email : req.email });
        const detailslist = await obj.details.findOne({ email : req.email });
        if (detailslist === null){
            await obj.details({ email : req.email , name : userlist.name }).save();
        }
        await obj.details.updateOne( {email:req.email} , 
            { $push : {  notes : untitledNote } } 
        );
        const userlist2 = await obj.details.findOne({ email : req.email });
        const newNote = await userlist2.notes.find( (item) => {
            return item.time.getTime() === untitledNote.time.getTime();
        });
        res.json( newNote );
    });

    return router;
}
