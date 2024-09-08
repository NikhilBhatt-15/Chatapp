import {Avatar, ListItem, Stack, Typography} from "@mui/material";
import {IconButton} from "@mui/material";
import {Add as AddIcon,Remove as RemoveIcon} from "@mui/icons-material";
import {memo, useState} from "react";


const UserItem = ({ user,handler,handlerIsLoading,isAdded=false }) => {
    const {name,_id,avatar} = user;
    const [isSelect,setIsSelect] = useState(isAdded);
    return (
        <ListItem>
            <Stack direction={"row"} alignItems={"center"} width={"100%"} spacing={"1rem"}>
                <Avatar src={avatar.toString()}/>
                <Typography
                    variant={"body1"}
                    sx={{
                    flexGrow:1,
                        display:"-webkit-box",
                        WebkitBoxOrient:"vertical",
                        WebkitLineClamp:1,
                        overflow:"hidden",
                        textOverflow:"ellipsis",
                    }}
                >{name}</Typography>
                <IconButton onClick={()=> {
                    handler(_id);
                    setIsSelect(!isSelect);
                }} disabled={handlerIsLoading}>
                    {isSelect?(<RemoveIcon color={"error"}/>):(<AddIcon color={"success"}/>)}
                </IconButton>
            </Stack>
        </ListItem>
    )

}


export default memo(UserItem);

