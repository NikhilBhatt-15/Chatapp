import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as events from "node:events";
const CookieOptions = {
    maxAge: 24*60*60*1000,
    httpOnly:true,
    sameSite:"none",
    secure:true
}
const connectDB = (uri)=>{
    mongoose
        .connect(uri,{dbName:'chat-app'})
        .then((data)=>{
        console.log("Connected to the database");
    })
        .catch((err)=> {
            throw err;
        });
}

const sendToken = (res,user,statusCode,message)=>{
    const token  = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: 1000*60*60*24
    });


    res.status(statusCode).cookie("user-token",token,CookieOptions).json({
        success:true,
        user,
        token,
        message
    });

}

const emitEvent = (req,event,user,data)=>{
    console.log("emitting event");
}
export  {connectDB,sendToken,emitEvent};