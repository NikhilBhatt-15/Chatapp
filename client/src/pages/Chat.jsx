import AppLayout from "../Components/layout/AppLayout";
import {Stack} from "@mui/material";
import {useRef} from "react";
import {IconButton} from "@mui/material";
import {AttachFile, Send} from "@mui/icons-material";
import {InputBox} from "../styles/StyledComponents.jsx";
import {ORANGE} from "../constants/color.js";
import {messages} from "../constants/sampleData.js";
import MessageComponent from "../Components/shared/Message.Component.jsx";

const Chat = ()=>{
    const containerRef = useRef(null);
    const user={
        _id:"1",
        name:"John Doe",
    }
    return(
        <>
            <Stack ref={containerRef}
                   boxSizing={"border-box"}
                   padding={"1rem"}
                   spacing={"1rem"}
                   bgcolor={"#85e5c9"}
                   height={"90%"}
                   sx={{
                       overflowX:"hidden",
                       overflowY:"auto",
                   }}
            >
                {
                    messages.map((message,index)=>(
                        <MessageComponent key={index} message={message} user={user}/>
                    ))
                }
            </Stack>
            <form style={
                {
                    height:"10%"
                }
            }>
            <Stack direction={"row"} height={"100%"} alignItems={"center"} padding={"0.5rem"} position={"relative"}>
                <IconButton sx={{
                    position:"absolute",
                    left:"0.8rem",
                }}>
                    <AttachFile/>
                </IconButton>
                <InputBox placeholder={"Type message here..."}/>
                <IconButton type={"submit"} sx={{
                    rotate:"-2deg",
                    backgroundColor:ORANGE,
                    color:"white",
                    marginLeft:"1rem",
                    "&:hover":{
                        bgcolor:"error.dark"
                    }
                }}>

                    <Send/>
                </IconButton>
            </Stack>


            </form>
        </>
    )
}

export default AppLayout()(Chat);