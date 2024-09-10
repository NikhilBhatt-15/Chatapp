import express from "express";
import {auth} from "../middlewares/auth.js";
import {
    addMembers,
    createNewGroupChat, deleteChat, getChatDetails, getMessages,
    getMyChats,
    getMyGroups,
    leaveGroup,
    removeMembers, rename, sendAttachment
} from "../controllers/chat.js";
import {attachmentsUpload} from "../middlewares/multer.js";



const app = express.Router();

app.use(auth);

app.post("/newgroup",createNewGroupChat);
app.get("/mychats",getMyChats);
app.get("/mygroups",getMyGroups);
app.put("/addmember",addMembers);
app.delete("/removemember",removeMembers);
app.delete("/leave/:chatId",leaveGroup);
app.put("/rename/:chatId",rename);
app.delete("/delete/:chatId",deleteChat);
app.get("/:chatId",getChatDetails);
app.get("/messages/:chatId",getMessages);
app.post("/message",attachmentsUpload,sendAttachment);
export default app;
