require('dotenv').config();

const express = require("express");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");

const router  = express.Router();

module.exports = ( obj ) => {

    // const authenticationRouter = require("./authentication");
    // router.use('/' , authenticationRouter({users:obj.users}));
    router.get('/' , async (req , res , next) => {    
        res.render('sign-up-verification');
    });
    router.post('/', async (req, res, next) => {
        try{
            if (req.cookies['accessToken'] === undefined ) throw ("NO ACCESS TOKEN");
            const payload = await jwt.verify( req.cookies['accessToken'] , process.env.ACCESS_TOKEN_SECRET);
            const userslist   = await obj.users.findOne({ email : payload.email });
            if (await bcrypt.compare( req.body.verificationCode , userslist.verificationCode )){
                let w = await obj.users.updateOne( {email : payload.email} , { verifiedUser : true } );
                console.log(w);
                res.redirect('/dashboard');
            } else {
                res.status(401).send("WRONG VERIFICATION CODE");   
            }
        } catch (e){ res.status(500).send(e); }
    });

    return router;
}
