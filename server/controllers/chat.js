import {TryCatch} from "../middlewares/error.js";
import {ErrorHandler} from "../utils/utility.js";
import {Chat} from "../models/chat.js";
import {emitEvent} from "../utils/features.js";
import {ALERT, REFETCH_CHATS} from "../constants/events.js";

const createNewGroupChat =TryCatch(async (req,res,next)=>{
    const {name,members} = req.body;
    if(members.length<2){
        return next(new ErrorHandler("Group chat must have at least 3 members",400));
    }
    const allMembers = [...members,req.user.id];
    await Chat.create({
        name,
        groupChat:true,
        creator:req.user.id,
        members:allMembers
    })
    emitEvent(req,ALERT,allMembers,{text:`Welcome to  ${name} group chat`});
    emitEvent(req,REFETCH_CHATS,members);

    return res.status(201).json({
        success:true,
        message:"Group chat created successfully"
    });
});

const getMyChats = TryCatch(async (req,res,next)=>{
    const chats = await Chat.find({members:req.user.id}).populate("members","name avatar");
    res.status(200).json({
        success:true,
        chats
    });
});
export {createNewGroupChat,getMyChats};