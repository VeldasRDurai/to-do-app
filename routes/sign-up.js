require('dotenv').config();

const express = require("express");
const path = require('path');
const nodemailer = require("nodemailer");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");

const router  = express.Router();

module.exports = ( obj ) => {

    const signUpVerificationRouter = require("./sign-up-verification");   
    router.use('/sign-up-verification',express.static(path.join(__dirname, 'public')));
    router.use('/sign-up-verification', signUpVerificationRouter({ users:obj.users , details:obj.details }) );

    router.get( '/' , (req, res, next) => {
        res.render("sign-up.ejs");
    });

    router.post( '/', async (req, res, next) => {
        try{
            const userlist = await obj.users.findOne({ email : req.body.email });
            if (userlist === null || !userlist.verifiedUser ){
                try{
                    let verificationCode = Math.floor( (Math.random() * 999999) + 1 );
                    let transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 587, secure: false, requiresAuth: true,
                        auth: { user: process.env.EMAIL , pass: process.env.PASSWORD }
                    });
                    let info = await transporter.sendMail({
                        from: "To Do Application " + process.env.EMAIL ,
                        to  :  req.body.email , 
                        subject: "User Verifictaion" ,
                        text: "Your user verifiction code for To Do Application is : " + verificationCode 
                    });
                    console.log("Message sent: %s", info.messageId);
 
                    const hashedPass   = await bcrypt.hash( req.body.password , 10 );
                    const hashedVerificationCode   = await bcrypt.hash( verificationCode.toString() , 10 );
                    const accessToken  = jwt.sign({email:req.body.email} , process.env.ACCESS_TOKEN_SECRET , {expiresIn:"15m"} );
                    const refreshToken = jwt.sign({email:req.body.email} , process.env.REFRESH_TOKEN_SECRET );
                    
                    const userdata   = { 
                        email : req.body.email , 
                        name : req.body.name , 
                        password : hashedPass , 
                        verificationCode : hashedVerificationCode ,
                        refreshToken : refreshToken
                    };
                    await obj.users(userdata).save();
                    
                    res.cookie( "accessToken" , accessToken  , { path:"/" ,  httpOnly:true , maxAge: 900000  } );
                    res.cookie( "refreshToken", refreshToken , { path:"/" ,  httpOnly:true } );
                    res.status(200).send();
                } catch(e) {
                    console.log(e); 
                    throw e; 
                }
            } else { 
                res.status(401).send("EMAIL ALREADY EXIST"); 
            }
        } catch (e){ res.status(500).send(e); }
    });

    return router;
}
