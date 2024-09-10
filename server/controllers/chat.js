import {TryCatch} from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary";
import {ErrorHandler} from "../utils/utility.js";
import {Chat} from "../models/chat.js";
import {User} from "../models/user.js";
import {emitEvent} from "../utils/features.js";
import {ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS} from "../constants/events.js";
import {Message} from "../models/message.js";

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
    const members = req.body.members;
    const chat = await Chat.findById(groupId);
    if(!members || members.length<1){
        return next(new ErrorHandler("Members are required",400));
    }


    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    if(!chat.groupChat){
        return next(new ErrorHandler("This is not a group chat",400));
    }
    if(chat.creator.toString()!==req.user.id){
        return next(new ErrorHandler("You are not the creator of this group chat",400));
    }
    const allNewMembersPromise = members.map((i)=>User.findById(i));
    const allNewMembers = await Promise.all(allNewMembersPromise);
    const uniqueMembers = allNewMembers.filter((member)=>!chat.members.includes(member.id))
        .map((member)=>member.id);

    chat.members.push(...uniqueMembers);
    if(chat.members.length>50){
        return next(new ErrorHandler("Group chat members cannot exceed 50",400));
    }
    await chat.save();

    const allUserNames = uniqueMembers.map((member)=>member.name).join(",");

    emitEvent(req,ALERT,chat.members,{text:`${allUserNames} have been added to ${chat.name} group chat`});
    emitEvent(req,REFETCH_CHATS,chat.members);
    res.status(200).json({
        success:true,
        message:"Members added successfully"
    });
});

const removeMembers = TryCatch(async(req,res,next)=>{
    const {chatId,members } = req.body;
    const chat = await Chat.findById(chatId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    if(!chat.groupChat){
        return next(new ErrorHandler("This is not a group chat",400));
    }
    if(!members || members.length<1){
        return next(new ErrorHandler("Members are required",400));
    }
    if(chat.creator.toString()!==req.user.id){
        return next(new ErrorHandler("You are not the creator of this group chat",404));
    }


    const allMembersPromise = members.map((i)=>User.findById(i));
    const allMembers = await Promise.all(allMembersPromise);

    const membersToRemove = allMembers.filter((member)=>chat.members.includes(member.id))
        .map((member)=>member.id);
    if(membersToRemove.includes(req.user.id)){
        return next(new ErrorHandler("You cannot remove yourself from the group chat",400));
    }
    if(membersToRemove.length<1){
        return next(new ErrorHandler("No members found to remove",404));
    }
    chat.members = chat.members.filter((member) => !membersToRemove.includes(member.toString()));
    if(chat.members.length<3){
        return next(new ErrorHandler("Group chat must have at least 3 members",400));
    }
    await chat.save();
    emitEvent(req,ALERT,chat.members,{text:`${membersToRemove.map((member)=>member.name).join(",")} have been removed from ${chat.name} group chat`});
    emitEvent(req,REFETCH_CHATS,chat.members);
    return res.status(200).json({
        success:true,
        message:"Members removed successfully"
    });

});

const leaveGroup = TryCatch(async(req,res,next)=>{
    // getting chatId from dynamic routing
    const chatId =req.params.chatId;
    const chat = await Chat.findById(chatId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    if(!chat.groupChat){
        return next(new ErrorHandler("This is not a group chat",400));
    }
    if(!chat.members.includes(req.user.id)){
        return next(new ErrorHandler("You are not a member of this group chat",400));
    }
    const remainingMembers = chat.members.filter((member)=>member.toString()!==req.user.id.toString());
    if(remainingMembers.length<3){
        await Chat.findById(chatId).deleteOne();
        emitEvent(req,ALERT,chat.members,{text:`${req.user.name} has left the group chat`});
        emitEvent(req,REFETCH_CHATS,chat.members);
        return res.status(200).json({
            success:true,
            message:"You have left the group chat"
        });
    }
    if(chat.creator.toString()===req.user.id){
        chat.creator = remainingMembers[0];
        await chat.save();
    }
    chat.members = remainingMembers;
    await chat.save();
    emitEvent(req,ALERT,chat.members,{text:`${req.user.name} has left the group chat`});
    emitEvent(req,REFETCH_CHATS,chat.members);

    return res.status(200).json({
        success:true,
        message:"You have left the group chat"
    });

})

const rename = TryCatch(async (req,res,next)=>{
    const chatId = req.params.chatId;
    const {name} = req.body;
    const chat = await Chat.findById(chatId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    if(!chat.groupChat){
        return next(new ErrorHandler("This is not a group chat",400));
    }
    if(chat.creator.toString()!==req.user.id.toString()){
        return next(new ErrorHandler("You are not the creator of this group chat",400));
    }
    if (!name){
        return next(new ErrorHandler("Name is required",400));
    }
    if(name.length<3){
        return next(new ErrorHandler("Name must be at least 3 characters long",400));
    }
    chat.name = name;
    await chat.save();
    emitEvent(req,ALERT,chat.members,{text:`Group chat name has been changed to ${name}`});
    emitEvent(req,REFETCH_CHATS,chat.members);
    return res.status(200).json({
        success:true,
        message:"Group chat name changed successfully"
    });
});

const deleteChat = TryCatch(async(req,res,next)=>{
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    if(chat.creator.toString()!==req.user.id.toString()){
        return next(new ErrorHandler("You are not the creator of this group chat",400));
    }
    const members = chat.members;
    await Chat.findById(chatId).deleteOne();
    emitEvent(req,ALERT,members,{text:`${chat.name} group chat has been deleted by ${req.user.name}`});
    emitEvent(req,REFETCH_CHATS,members);
    return res.status(200).json({
        success:true,
        message:"Group chat deleted successfully"
    });
});

const getChatDetails = TryCatch(async(req,res,next)=>{
    const chatId = req.params.chatId;
    console.log(req.query.populate);
    if(req.query.populate==="true"){

        const chat = await Chat.findById(chatId).populate("members","name avatar").lean();
        if(!chat){
            return next(new ErrorHandler("Chat not found",404));
        }
        chat.members = chat.members.map((member)=> {
            return {
                _id:member._id,
                name:member.name,
                avatar:member.avatar.url
            }
        });
        return res.status(200).json({
            success:true,
            chat
        });
    }
    else{
        const chat = await Chat.findById(chatId);
        if(!chat){
            return next(new ErrorHandler("Chat not found",404));
        }
        return res.status(200).json({
            success:true,
            chat
        });
    }
});

const getMessages = TryCatch(async(req,res,next)=>{
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    const messages =await Message.find({chat:chat._id}).populate("sender","name avatar");
    res.status(200).json({
        success:true,
        messages
    });
});

const sendAttachment =TryCatch(async(req,res,next)=>{
    const chatId = req.body.chatId;
    const files = req.files;
    const chat = await Chat.findById(chatId);
    if(!chat){
        return next(new ErrorHandler("Chat not found",404));
    }
    if(!files || files.length<1){
        return next(new ErrorHandler("Content is required",400));
    }

     // upload files to cloudinary
    const attachments = [];

    const messageForRealTime={
         content:"",
         attachments,
         sender:{
                _id:req.user.id,
                name:req.user.name,
                avatar:req.user.avatar.url
         },
         chat:chatId,
     };
    emitEvent(req,NEW_ATTACHMENT,chat.members,{
        message:messageForRealTime,
        chatId,
    })
    emitEvent(req,NEW_MESSAGE_ALERT,chat.members, {chatId});


    const messageForDb = {
        sender:req.user.id,
        chat:chatId,
        content:"",
        attachment:attachments
    }
    const newMessage = await Message.create(messageForDb);

    res.status(201).json({
        success:true,
        message:newMessage
    });

});




export {
    createNewGroupChat,
    getMyChats,
    getMyGroups,
    addMembers,
    removeMembers,
    leaveGroup,
    rename,
    deleteChat,
    getChatDetails,
    getMessages,
    sendAttachment};