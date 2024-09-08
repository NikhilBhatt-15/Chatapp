import {User} from "../models/user.js";
import {sendToken} from "../utils/features.js";
import {compare} from "bcrypt";
import {TryCatch} from "../middlewares/error.js";
import {ErrorHandler} from "../utils/utility.js";
import jwt from "jsonwebtoken";
// creates a new user generates a token and sends it to the user
const register = TryCatch(async (req,res,next)=>{
    const {name,username,password} = req.body;
    const user = await User.create({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        avatar:{
            public_id:"123",
            url:"https://res.cloudinary.com/dqcsk8rsc/image/upload/v1630988654/123.jpg"
        }
    });
    sendToken(res,user,201,"User registered successfully");

});

const login =  TryCatch(async (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return next(new ErrorHandler("Please enter username and password",400));
    }
    const user = await User.findOne({username}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid credentials",404));
    }
    const isMatch = await compare(password,user.password);
    if(!isMatch){
        return next(new ErrorHandler("Invalid credentials",404));
    }
    sendToken(res,user,200,"User logged in successfully");

});

const profile = TryCatch(async (req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user
    });
});

const logout = TryCatch(async (req,res,next)=>{
    res.cookie("user-token","none",{
        expires:new Date(Date.now()),
        httpOnly:true,
        sameSite:"none",
        secure:true
    });
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    });
});

const searchUser=TryCatch(async (req,res,next)=>{
    const {username} = req.query;
    if(!username){
        return next(new ErrorHandler("Please enter a username",400));
    }
    const user = await User.findOne({username});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    res.status(200).json({
        success:true,
        user
    });
});

export {register,login,profile,logout,searchUser};