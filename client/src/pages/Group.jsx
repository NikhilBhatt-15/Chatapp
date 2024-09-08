import React, {lazy, memo, Suspense, useState} from "react";
import {Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {
    Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace, Menu as MenuIcon
} from "@mui/icons-material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Link} from "../styles/StyledComponents.jsx";
import AvatarCard from "../Components/shared/AvatarCard.jsx";
import {chats, users} from "../constants/sampleData.js";
import UserItem from "../Components/shared/UserItem.jsx";
const AddMemberDialog = lazy(()=>import("../Components/dialogs/AddMemberDialog.jsx"));
const ConfirmDeleteDialog = lazy(()=>import("../Components/dialogs/ConfirmDeleteDialog.jsx"));
const Group = () => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [grpName, setGrpName] = useState("Group Name");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isAddMember, setIsAddMember] = useState(false);
    const chatId = useSearchParams()[0].getAll("group");
    const handleMobile =()=> {
        setIsMobile((prev) => !prev);
    }
    const updateGroupName = ()=> {
        setIsEdit(false);
    }
    const handleMobileClose = () => {
        setIsMobile(false);
    }
    const confirmDeleteHandler = () => {
        setConfirmDelete(false);
    }
    const addMemberHandler = () => {
        setIsAddMember(true);
    }
    const openConfirmDelete = () => {
        setConfirmDelete(true);
    }
    const closeConfirmDelete = () => {
        setConfirmDelete(false);
    }
    const addToGroup = (members=[]) => {
        console.log(members);
        setIsAddMember(false);
    }
    const GroupList = ({w = "100%", groups = [], chatId}) => {

        return (<Stack width={w} spacing={"1rem"}>
            {groups.length > 0 ? (groups.map((group, index) => (
                <GroupItem chatId={chatId} group={group} key={index}/>))) : (
                <Typography textAlign={"center"} padding={"1rem"} variant={"h6"}>No group found</Typography>)}
        </Stack>)
    }
    const MemberList =()=>{
        return (
            <>
                <Stack direction={"column"} alignItems={"center"} spacing={"1rem"}>
                    {
                        users.map((user,index)=>(
                            <UserItem key={index} user={user} handler={()=>{}} isAdded={true}/>
                        ))
                    }
                </Stack>
            </>
        )
    }
    const Iconbtns = <>
        <IconButton sx={{
            display: {
                xs: "block", sm: "none"
            }, position: "absolute", right: "1rem", top: "1rem",
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
        {isEdit ? <>

            <TextField variant={"outlined"} type={"text"} placeholder={"Enter Group Name"} value={grpName}
                       onChange={(e) => {
                           setGrpName(e.target.value);
                       }}/>
            <IconButton onClick={updateGroupName}>
                <DoneIcon/>
            </IconButton>

        </> : <>
            <Typography variant={"h4"}>{grpName}</Typography>
            <IconButton onClick={() => setIsEdit(true)}><EditIcon/></IconButton>
        </>}
    </Stack></>
    const GroupItem = memo(({group, chatId}) => {
        const {name, avatar, _id} = group;

        return (<Link to={`?group=${_id}`} onClick={(e) => {
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
        </Link>)
    })
    const ButtonGroup = <>
        <Stack direction={{
            sm: "row", xs: "column-reverse"
        }}
               spacing={"1rem"}
               padding={{
                   xs: "0", sm: "1rem", md: "1rem 4rem"
               }}>
            <Button size={"large"} variant={"contained"} color={"error"} startIcon={<DeleteIcon/>}
                    onClick={openConfirmDelete}>Delete Group</Button>
            <Button size={"large"} variant={"contained"} color={"primary"} startIcon={<AddIcon/>}
                    onClick={addMemberHandler}>Add Member</Button>

        </Stack>
    </>

    return (<Grid container height={"100vh"}>
        <Grid item sm={3} sx={{
            display: {
                xs: "none", sm: "block"
            }, bgcolor: "rgba(0,0,0,0.1)",
        }}><GroupList groups={chats} chatId={chatId}/></Grid>
        <Grid item xs={12} sm={9} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem",
        }}>
             {Iconbtns}
            {chatId.length?(<>
                 {GroupName}
                 <Typography variant={"h6"} margin={"1rem"} alignSelf={"flex-start"}>Members</Typography>
                 <Stack maxWidth={"30rem"}
                        width={"100%"}
                        boxSizing={"border-box"}
                        padding={{
                            sm: "1rem", xs: "0", md: "1rem 4rem"
                        }}
                        spacing={"2rem"}
                        bgcolor={"bisque"}
                        height={"60vh"}
                        overflow={"auto"}>
                     <MemberList/>
                 </Stack>
                 {ButtonGroup}
             </>):(<Typography variant={"h4"}>Select a group</Typography>)}
        </Grid>
        {
            isAddMember && <Suspense fallback={<div>Loading...</div>}>
                <AddMemberDialog open={isAddMember} onClose={()=>{
                    setIsAddMember(false);
                }} onAdd={addToGroup} />
            </Suspense>
        }
        {
            confirmDelete && <>
            <Suspense fallback={<div>Loading...</div>} >
                <ConfirmDeleteDialog open={confirmDelete} handleClose={closeConfirmDelete} handleDelete={confirmDeleteHandler} />
            </Suspense>
            </>
        }
        <Drawer open={isMobile} onClose={handleMobileClose}>
            <GroupList w={"80vw"} groups={chats} chatId={chatId}/>
        </Drawer>
    </Grid>)

}


export default Group;