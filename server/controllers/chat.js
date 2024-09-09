import {TryCatch} from "../middlewares/error.js";
import {ErrorHandler} from "../utils/utility.js";
import {Chat} from "../models/chat.js";
import {User} from "../models/user.js";
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
    const transformedChats = chats.map(({_id,name,groupChat,members})=>{
        return{
            _id,
            name,
            groupChat,
            avatar:groupChat?members.slice(0,3).map((member)=>member.avatar.url):null,
            members:members.reduce((prev,curr)=>{
                if(curr._id.toString()!==req.user.id){
                    prev.push(curr._id);
                }
                return prev;
            },[])
        }
    })
    res.status(200).json({
        success:true,
        chats:transformedChats
    });
});

const getMyGroups = TryCatch(async(req,res,next)=>{
    const chats = await Chat.find({members:req.user.id,groupChat:true,creator:req.user.id}).populate("members","name avatar");
    const transformedChats = chats.map(({_id,name,members})=>{
        return {
            _id,
            name,
            avatar:members.slice(0,3).map((member)=>member.avatar.url),
            members:members.reduce((prev,curr)=>{
                if(curr._id.toString()!==req.user.id){
                    prev.push(curr._id);
                }
                return prev;
            },[])
        }
    });
    res.status(200).json({
        success:true,
        chats:transformedChats
    });
})

const addMembers = TryCatch(async(req,res,next)=>{
    const groupId = req.body.chatId;
    const chat = await Chat.findById(groupId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    if(!chat.groupChat){
        return next(new ErrorHandler("This is not a group chat",400));
    }
    if(chat.creator.toString()!==req.user.id){
        return next(new ErrorHandler("You are not the creator of this group chat",400));
    }
    const members = req.body.members.filter((member)=>!chat.members.includes(member));

    // validate members
    const membersExist = await User.find({_id:{$in:members}});

    if(membersExist.length!==members.length){
        return next(new ErrorHandler("Some members do not exist",400));
    }
    const allMembers = [...chat.members,...members];
    await Chat.updateOne({_id:groupId},{members:allMembers});
    emitEvent(req,ALERT,members,{text:`You have been added to ${chat.name} group chat`});
    emitEvent(req,REFETCH_CHATS,members);
    res.status(200).json({
        success:true,
        message:"Members added successfully"
    });
});

const removeMembers = TryCatch(async(req,res,next)=>{
    const groupId = req.body.chatId;
    const chat = await Chat.findById(groupId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    const members = req.body.members.filter((member)=>chat.members.includes(member));
    if(members.length<1){
        return next(new ErrorHandler("Members not in the group chat",400));
    }
    const allMembers = chat.members.filter((member)=>!members.includes(member));
    await Chat.updateOne({_id:groupId},{members:allMembers});
    emitEvent(req,ALERT,members,{text:`You have been removed from ${chat.name} group chat`});
    emitEvent(req,REFETCH_CHATS,members);
    res.status(200).json({
        success:true,
        message:"Members removed successfully"
    });
});


export {createNewGroupChat,getMyChats,getMyGroups,addMembers,removeMembers};