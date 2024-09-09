import express from "express";
import {auth} from "../middlewares/auth.js";
import {addMembers, createNewGroupChat, getMyChats, getMyGroups} from "../controllers/chat.js";



const app = express.Router();

app.use(auth);

app.post("/newgroup",createNewGroupChat);
app.get("/mychats",getMyChats);
app.get("/mygroups",getMyGroups);
app.post("/addmember",addMembers);

export default app;
