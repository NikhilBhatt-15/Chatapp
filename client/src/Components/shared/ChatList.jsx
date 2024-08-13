import { Stack } from "@mui/material";
import ChatItem from "./ChatItem";
 const ChatList = ({width= "100%",chats= [],chatId,onlineUsers=[],newMessagesAlert,handleDeleteChat})=>{

    return <Stack width={width} >
        {
            chats.map((data,index)=>{
                const {avatar,name,_Id,groupChat,members} = data;

                const newMessageAlert = newMessagesAlert.find(({chatId})=>chatId == _Id);


                // check if any of the members is online
                const isOnline = members.some((member)=>onlineUsers.includes(member));
                return(<ChatItem  avatar={avatar} name={name} key={index} chatId={_Id} sameSender={chatId==_Id} isOnline={isOnline} groupChat={groupChat} handleDeleteChat={handleDeleteChat} newMessage={newMessageAlert}/>)
            })
        }
    </Stack>
}

 export default ChatList;