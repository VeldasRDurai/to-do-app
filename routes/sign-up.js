require('dotenv').config();

const express = require("express");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");

const router  = express.Router();

module.exports = ( obj ) => {

    router.get( '/' , (req, res, next) => {
        res.render("sign-up.ejs");
    });

    router.post( '/', async (req, res, next) => {
        try{
            const userlist = await obj.users.findOne({ username : req.body.username });
            if (userlist === null){
                const hashedPass = await bcrypt.hash( req.body.password , 10 );
                const userdata   = { username : req.body.username , password : hashedPass };
                await obj.users(userdata).save();

                const accessToken  = jwt.sign({username:req.body.username} , process.env.ACCESS_TOKEN_SECRET , {expiresIn:"15m"} );
                const refreshToken = jwt.sign({username:req.body.username} , process.env.REFRESH_TOKEN_SECRET );
                await obj.users.updateOne( {username:req.body.username} , {refreshToken:refreshToken} );
                res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000  } );
                res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );
    
                res.status(201).send("ACCOUNT CREATED...!");
            } else { res.status(401).send("USERNAME ALREADY EXIST"); }
        } catch (e){ res.status(500).send(e); }
    });

    return router;
}
