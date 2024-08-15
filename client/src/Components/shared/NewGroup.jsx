import {Button, Dialog, DialogTitle,List, Stack, TextField, Typography} from "@mui/material";
import UserItem from "./UserItem.jsx";
import {users} from "../../constants/sampleData.js";
import {useState} from "react";

const NewGroup = ()=>{
    const [members,setMembers] = useState(users);
    const [selectedMembers,setSelectedMembers] = useState([]);

    const selectMemberHandler = (id)=>{
        if(selectedMembers.includes(id)) {
            setSelectedMembers(selectedMembers.filter(member => member !== id));
        }
        else {
            setSelectedMembers([...selectedMembers,id]);
        }
    }
    console.log(selectedMembers);
    const handleSubmission = ()=>{
        console.log("submitted");
    }
    return (
        <Dialog open={true} >
            <DialogTitle align={"center"} variant={"h4"}>Create New Group</DialogTitle>
            <Stack  p={{
                xs:"1rem",
                sm:"2rem"
            }} maxWidth={"35rem"} spacing={"1rem"} width={"100%"}>
                <TextField type={"text"} label={"Group Name"} variant={"outlined"} size={"small"} required={true}></TextField>
                <Typography variant={"h5"} align={"center"}>Add Members</Typography>
                <List>
                    {
                        members.map((user,index)=>(
                            <UserItem user={user} key={index} handler={selectMemberHandler} />
                        ))
                    }
                </List>
                <Stack direction={"row"} justifyContent={"space-between"} padding={"1rem"}>
                    <Button variant={"outlined"} color={"error"} >Cancel</Button>
                    <Button variant={"contained"} onClick={()=>handleSubmission()}>Create</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default NewGroup