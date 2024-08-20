import { List, Stack } from "@mui/material";
import ChatItem from "./ChatItem";

const ChatList = ({ width = "100%", chats = [], chatId, onlineUsers = [], newMessagesAlert, handleDeleteChat }) => {
    return (
        <Stack
            width={width}
            height={"100%"}
            sx={{
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#555",
                },
            }}
        >
            {chats.map((data, index) => {
                const { avatar, name, _id, groupChat, members } = data;
                const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId == _id);
                const isOnline = members.some((member) => onlineUsers.includes(member));
                return (
                    <ChatItem
                        avatar={avatar}
                        name={name}
                        key={index}
                        chatId={_id}
                        sameSender={chatId == _id}
                        isOnline={isOnline}
                        groupChat={groupChat}
                        handleDeleteChat={handleDeleteChat}
                        newMessage={newMessageAlert}
                    />
                );
            })}
        </Stack>
    );
};

export default ChatList;