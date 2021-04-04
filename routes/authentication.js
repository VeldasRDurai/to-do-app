require('dotenv').config();

const express = require("express");
const jwt     = require("jsonwebtoken");

const router  = express.Router();

module.exports = ( obj ) => {

    router.use('/', async ( req , res , next ) => {
        console.log("Reached authentication");
        try{
            const payload = await jwt.verify( req.cookies['accessToken'] , process.env.ACCESS_TOKEN_SECRET);
            req.username = payload.username;
        } catch {
            try{
                const payload = await jwt.verify( req.cookies['refreshToken'] , process.env.REFRESH_TOKEN_SECRET);
                const user = await obj.users.findOne({ username : payload.username });
                if ( user.refreshToken !== req.cookies['refreshToken'] ) throw ("TOKEN NOT MATCHING TOKEN IN DATABASE") ;
                const accessToken  = jwt.sign({ username : payload.username } , process.env.ACCESS_TOKEN_SECRET , { expiresIn : "15m" });
                const refreshToken = jwt.sign({ username : payload.username } , process.env.REFRESH_TOKEN_SECRET );
                await obj.users.updateOne( { username : payload.username } , { refreshToken : refreshToken } );
                res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000 } );
                res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );            
                req.username = payload.username;
            } catch (e) { return res.status(401).send( e ); }
        }
        next();
    });

    return router;
}
