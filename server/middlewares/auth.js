import {TryCatch} from "./error.js";
import {ErrorHandler} from "../utils/utility.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";

const auth =  TryCatch(async (req, res, next) => {
    const token = req.cookies['user-token'];
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return next(new ErrorHandler("Invalid token",401));
    }
    const user  = await User.findById(decoded.id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    req.user = user;
    next();
});

export {auth};