import  { memo } from "react";
import { Box, Stack , Typography} from "@mui/material";
import { Link } from "../../styles/StyledComponents";
const ChatItem = ({
                      avatar=[],
                      name,
                      chatId,
                      groupChat=false,
                      sameSender,
                      isOnline,
                      newMessage=[],
                      index=0,
                      handleDeleteChatOption
})=>{
    return (
        <>
            <Link to={`/chat/${chatId}`} onContextMenu={(e)=> handleDeleteChatOption(e,chatId,groupChat)}>
            <div style={
                {
                    display:"flex",
                    gap:"1rem",
                    alignItems:"center",
                    padding:"1rem",     
                    backgroundColor: sameSender?"grey":"unset",
                    color:sameSender?"white":"unset",
                    position:"relative",
                }
            }>
                {
                    // Avatar card
                }
                <Stack>
                    <Typography>{name}</Typography>
                    {
                        newMessage && <Typography>{newMessage.length} New Message</Typography>

                    }

                </Stack>
                {
                    isOnline &&(
                        <Box sx={
                            {
                                width:"10px",
                                height:"10px",
                                backgroundColor:"green",
                                borderRadius:"50%",
                                position:"absolute",
                                top:"50%",
                                right:"1rem",
                                transform:"translateY(-50%)"
                            }
                        }/>
                    )
                }

            </div>
            </Link>
        </>
    )
}

export default   memo(ChatItem) ;