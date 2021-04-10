require('dotenv').config();

const express = require("express");
const jwt     = require("jsonwebtoken");
const verify  = require("./google-authentication");

const router  = express.Router();

module.exports = ( obj ) => {

    router.use('/', async ( req , res , next ) => {
        try{
            if (req.cookies['accessToken'] === undefined ) throw ("NO ACCESS TOKEN");
            const payload = await jwt.verify( req.cookies['accessToken'] , process.env.ACCESS_TOKEN_SECRET);
            const user = await obj.users.findOne({ email : payload.email });
            if( !user.verifiedUser ) throw ("NOT A VERIFIED USER");
            req.email = payload.email;
            next();
        } catch {
            try{
                if (req.cookies['refreshToken'] === undefined ) throw ("NO ACCESS TOKEN");
                const payload = await jwt.verify( req.cookies['refreshToken'] , process.env.REFRESH_TOKEN_SECRET);
                const user = await obj.users.findOne({ email : payload.email });
                if (!user.verifiedUser ) throw ("NOT A VERIFIED USER");
                if ( user.refreshToken !== req.cookies['refreshToken'] ) throw ("TOKEN NOT MATCHING TOKEN IN DATABASE") ;
                const accessToken  = jwt.sign({ email : payload.email } , process.env.ACCESS_TOKEN_SECRET , { expiresIn : "15m" });
                const refreshToken = jwt.sign({ email : payload.email } , process.env.REFRESH_TOKEN_SECRET );
                await obj.users.updateOne( { email : payload.email } , { refreshToken : refreshToken } );
                res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000 } );
                res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );            
                req.email = payload.email;
                next();
            } catch {
                try {
                    let token = req.cookies['session-token'];
                    req.user = await verify(token);
                    req.email = req.user.email ;
                    next();
                } catch (e) {
                     res.redirect('/log-in');
                }
            } 
        }
    });

    return router;
}
