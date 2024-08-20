import {memo} from "react";
import {Box, Typography} from "@mui/material";
import moment from "moment";
import {fileFormat} from "../../lib/Features.js";
import RenderContent from "./RenderContent.jsx";
const MessageComponent = ({ message,user }) => {
    const {sender,content,attachments=[],created_at } = message;
    const timeAgo = moment(created_at).fromNow();

    return (
        <Box
            sx={{
                alignSelf:sender._id===user._id?"flex-end":"flex-start",
                backgroundColor:"white",
                color:"black",
                borderRadius:"5px",
                padding:"0.5rem",
                width:"fit-content",
            }}
        >
            {
                sender._id!==user._id && <Typography variant={"caption"} fontWeight={"600"} color={"#2694ab"}>{sender.name}</Typography>
            }
            {
                content && <Typography variant={"body1"}>{content}</Typography>
            }
            {
                attachments.length>0 && attachments.map((attachment,index)=>{
                        const url =attachment.url;
                        const file =fileFormat(url);
                        return (
                            <Box key={index}>
                                <a href={url} target={"_blank"} rel={"noreferrer"} download={true} color={"black"}>
                                    {<RenderContent file={file} url={url}/>}
                                </a>
                            </Box>
                        )
                    }
                )
            }

            <Typography variant={"caption"} color={"#6c757d"}>{timeAgo}</Typography>

        </Box>
    )
}

export default memo(MessageComponent);