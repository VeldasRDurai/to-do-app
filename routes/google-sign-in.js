const express = require("express");
const router = express.Router();

const verify = require('./google-authentication');

module.exports = obj => {

    router.post( '/', async (req, res, next) => {
        try {
            let token = req.body.token;
            // console.log(token);
            let payload = await verify(token); 
            const userlist = await obj.users.findOne({ email : payload.email });
            if (userlist === null){
                const userdata   = { email : payload.email , name : payload.name , googleSignIn : true };
                await obj.users(userdata).save();
            } else if ( !userlist.googleSignIn ){
                res.send(401).send("YOU ARE NOT A GOOGLE USER")
            }
            res.cookie('session-token',token);
            res.send('success');
        } catch (e) { res.status(500).send(e); }
    });
    return router;
}