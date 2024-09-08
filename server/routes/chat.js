import express from "express";
import {auth} from "../middlewares/auth.js";
import {createNewGroupChat, getMyChats} from "../controllers/chat.js";



const app = express.Router();

app.use(auth);

app.post("/newgroup",createNewGroupChat);
app.get("/mychats",getMyChats);

export default app;
