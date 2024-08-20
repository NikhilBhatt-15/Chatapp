import React, {memo, useState} from "react";
import {Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {Done as DoneIcon, Edit as EditIcon, KeyboardBackspace, Menu as MenuIcon} from "@mui/icons-material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {InputBox, Link} from "../styles/StyledComponents.jsx";
import AvatarCard from "../Components/shared/AvatarCard.jsx";
import {chats} from "../constants/sampleData.js";

const Group = () => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [grpName, setGrpName] = useState("Group Name");
    const chatId = useSearchParams()[0].getAll("group");
    console.log(chatId);


    function handleMobile() {
        setIsMobile((prev) => !prev);
    }

    function updateGroupName(){
        setIsEdit(false);
    }



    function handleMobileClose() {
        setIsMobile(false);
    }
    const Iconbtns = <>
        <IconButton sx={{
            display: {
                xs: "block",
                sm: "none"
            },
            position: "absolute",
            right: "1rem",
            top: "1rem",
        }} onClick={handleMobile}>
            <MenuIcon/>
        </IconButton>
        <Tooltip title={"back"}>
            <IconButton sx={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                bgcolor: "rgba(0,0,0,0.7)",
                color: "white",
                "&:hover": {
                    bgcolor: "rgba(0,0,0,0.5)"
                }
            }} onClick={() => {
                navigate("/")
            }}>
                <KeyboardBackspace/>
            </IconButton>
        </Tooltip>
    </>
    const GroupName = <> <Stack direction={"row"} alignItems={"center"}
                                justifyContent={"center"} spacing={"1rem"} width={"100%"}
    >
        {
            isEdit ? <>

                <TextField variant={"outlined"} type={"text"} placeholder={"Enter Group Name"} value={grpName} onChange={(e)=>{
                    setGrpName(e.target.value);
                }}/>
                <IconButton onClick={updateGroupName}>
                    <DoneIcon/>
                </IconButton>

            </> : <>
                <Typography variant={"h4"}>{grpName}</Typography>
                <IconButton onClick={() => setIsEdit(true)}><EditIcon/></IconButton>
            </>
        }
    </Stack></>

    const GroupList = ({w = "100%", groups = [], chatId}) => {

        return (
            <Stack width={w} spacing={"1rem"}>
                {
                    groups.length > 0 ? (
                        groups.map((group, index) => (
                            <GroupItem chatId={chatId} group={group} key={index}/>
                        ))) : (
                        <Typography textAlign={"center"} padding={"1rem"} variant={"h6"}>No group found</Typography>
                    )
                }
            </Stack>
        )
    }
    const GroupItem = memo(({group, chatId}) => {
        const {name, avatar, _id} = group;

        return (
            <Link to={`?group=${_id}`} onClick={(e) => {
                if (chatId == _id) {
                    e.preventDefault();
                }
                setGrpName(name);

                // e.preventDefault();
            }}>
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                    <AvatarCard avatar={avatar}/>
                    <Typography textAlign={"center"} variant={"h6"}>{name}</Typography>
                </Stack>
            </Link>
        )
    })
    return (
        <Grid container height={"100vh"}>
            <Grid item sm={3} sx={{
                display: {
                    xs: "none",
                    sm: "block"
                },
                bgcolor: "rgba(0,0,0,0.1)",
            }}><GroupList groups={chats} chatId={chatId}/></Grid>
            <Grid item xs={12} sm={9} sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                padding: "1rem 3rem",
            }}>
                {Iconbtns}
                {GroupName}
                <Typography variant={"h5"}>Members</Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>

                </Stack>
            </Grid>
            <Drawer open={isMobile} onClose={handleMobileClose}>
                <GroupList w={"80vw"} groups={chats} chatId={chatId}/>
            </Drawer>
        </Grid>
    )
}




export default Group;