const express = require("express");
const router = express.Router();

const verify = require('./google-authentication');

module.exports = obj => {

    router.post( '/', async (req, res, next) => {
        try {
            let token = req.body.token;
            console.log(token);
            let payload = await verify(token); 
            const userlist = await obj.users.findOne({ username : payload.email });
            if (userlist === null){
                const userdata   = { username : payload.email };
                await obj.users(userdata).save();
            }
            res.cookie('session-token',token);
            res.send('success');
        } catch (e) { res.send(e); }
    });
    return router;
}