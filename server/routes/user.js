import express from "express";
import {login, register, profile, logout, searchUser} from "../controllers/user.js";
import {singleUpload} from "../middlewares/multer.js";
import {auth} from "../middlewares/auth.js";
const app = express.Router();

// Auth routes
app.post("/register",singleUpload,register);
app.post("/login",login);


app.use(auth);
app.get("/profile",profile);
app.get("/logout",logout);
app.get("/search",searchUser);
export default app;
