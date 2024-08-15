import {Dialog, DialogTitle, InputAdornment, List, Stack, TextField} from "@mui/material";
import {useInputValidation} from "../../hooks/forms.jsx";
import {Search as SearchIcon} from "@mui/icons-material";
import UserItem from "./UserItem.jsx";
import {users as usersList} from "../../constants/sampleData.js";
import {useState} from "react";

const Search = ()=>{
    const search = useInputValidation("");
    const [users,setUsers] = useState(usersList);

    const addFriendHandler =(id)=>{
        console.log(id);
    }
    return(
        <Dialog open={true}>
            <Stack padding={"2rem"} width={"25rem"} direction={"column"}>
                <DialogTitle textAlign={"center"}> Find People</DialogTitle>
                <TextField type={"text"} label={""}
                           value={search.value}
                            onChange={search.changeHandler}
                            variant={"outlined"}
                           size={"small"}
                           InputProps={{
                               startAdornment: (
                                    <InputAdornment position={"start"}>
                                        < SearchIcon/>
                                    </InputAdornment>
                               )
                           }
                           }

                ></TextField>
               <List>
                   {
                       users.map((user,index)=>(

                               <UserItem user={user} key={index} handler={addFriendHandler} handlerIsLoading={false}/>

                       ))
                   }
               </List>
            </Stack>
        </Dialog>
    );
}

export default Search