require('dotenv').config();

const express = require("express");
const jwt     = require("jsonwebtoken");

const router  = express.Router();

module.exports = ( obj ) => {

    const authenticationRouter = require("./authentication");
    router.use('/' , authenticationRouter({users:obj.users}));
    router.get( '/', async (req, res, next) => {
        try{
            const payload = await jwt.verify( req.cookies['accessToken'] , process.env.ACCESS_TOKEN_SECRET);
            await obj.users.updateOne( { username : payload.username } , { refreshToken : null } );
            res.clearCookie( "accessToken");
            res.clearCookie( "refreshToken");
            res.status(201).send("LOGGED OUT...!");
        } catch {
            try{
                const payload = await jwt.verify( req.cookies['refreshToken'] , process.env.REFRESH_TOKEN_SECRET);
                const user = await obj.users.findOne({ username : payload.username });
                if ( user.refreshToken !== req.cookies['refreshToken'] ) throw ("TOKEN NOT MATCHING TOKEN IN DATABASE") ;
                await obj.users.updateOne( { username : payload.username } , { refreshToken : null } );
                res.clearCookie( "accessToken");
                res.clearCookie( "refreshToken");
                res.status(201).send("LOGGED OUT...!");
            } catch {
                try {
                    res.clearCookie('session-token');
                    res.send();
                    // res.redirect('/log-in');
                } catch (e) { 
                    return res.status(401).send( e ); 
                }
            }
        }
    });

    return router;
}
