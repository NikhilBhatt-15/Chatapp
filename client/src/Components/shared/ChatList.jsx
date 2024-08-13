import React from "react";
import { Stack } from "@mui/material";
import ChatItem from "./ChatItem";
 const ChatList = ({width= "100%",chats= [],chatId,onlineUsers=[],newMessagesAlert=[{
    chatId:"",
    count:4
}],handleDeleteChat})=>{

    return <Stack width={width} >
        {
            chats.map((data,index)=>{
                return(<ChatItem  name={data.name} key={data.chatId} chatId={data.chatId} sameSender={true} isOnline={true} newMessage={" vks vkk e"} />)
            })
        }
    </Stack>
}

 export default ChatList;