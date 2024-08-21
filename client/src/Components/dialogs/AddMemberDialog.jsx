import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Stack, Typography,
} from "@mui/material";
import {users} from "../../constants/sampleData.js";
import UserItem from "../shared/UserItem.jsx";
import {useEffect, useState} from "react";

const AddMemberDialog = ({ open, onClose, onAdd,chatId }) => {
    const [members,setMembers] = useState(users);
    const [selectedMembers,setSelectedMembers] = useState([]);


    const addMemberHandler = (id)=>{
        if(selectedMembers.includes(id)) {
            setSelectedMembers(selectedMembers.filter(member => member !== id));
        }
        else {
            setSelectedMembers([...selectedMembers,id]);
        }
    }
    useEffect(() => {
        setMembers(users);

        return ()=>{
            setSelectedMembers([]);
        }
    }, []);
    const addMemberSubmitHandler = ()=>{
        console.log("submitted");
        onAdd(selectedMembers);
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <Stack alignItems={"center"}>
                <DialogTitle>Add Member</DialogTitle>
                <Stack>
                    {
                        members.length>0?members.map((user, index) => (
                            <UserItem key={index} user={user} handler={addMemberHandler} />
                        )):<Typography textAlign={"center"}>No friends</Typography>
                    }
                </Stack>
                <Box margin={"1rem"}>
                    <Button onClick={onClose} color={"error"}>Cancel</Button>
                    <Button onClick={addMemberSubmitHandler}>Add to Group</Button>
                </Box>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog;