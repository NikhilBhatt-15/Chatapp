import React,{useState} from "react";
import {Container,Paper,Typography,TextField,Button,Stack,Avatar,IconButton}from "@mui/material";
import {CameraAlt} from "@mui/icons-material"
import VisuallyHiddenInput from "../styles/StyledComponents"
import {usernameValidator,passwordValidator,nameValidator} from "../utils/Validator"
import { useInputValidation,useFileHandler } from "../hooks/forms";

const Login = ()=>{

    const [isLogin,setIsLogin] = useState(true);
    const name = useInputValidation("",nameValidator);
    const bio = useInputValidation("");
    const username = useInputValidation("",usernameValidator);
    const password = useInputValidation("",passwordValidator);
    const avatar =useFileHandler("single")

    const handleSubmit = async(e)=>{
        // when backend is done 
    }


    return <Container component={"main"} maxWidth ="xs" 
    sx={
        {
            height:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }
    }
    >
        
    <Paper
        elevation={3}
        sx={
            {
                padding:4,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
            }
        }
    >
        {isLogin?<>
            <Typography variant="h5">Login</Typography>
            <form style={
                {
                    width:"100%",
                    marginTop:"1rem"
                }
            }>
                <TextField required fullWidth label="username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler}></TextField>
                {
                    username.error && <Typography color={"error"} variant="caption">{username.error}</Typography>
                }
                <TextField required fullWidth label="password" margin="normal" variant="outlined" type="password" value={password.value} onChange={password.changeHandler}></TextField>
                {
                    password.error && <Typography color={"error"} variant="caption">{password.error}</Typography>
                }
                <Button sx={
                    {
                        marginTop:"1rem"
                    }
                }
                variant="contained" color="primary" type="Submit" fullWidth>Login</Button>

                <Typography  textAlign={"center"} m={"1rem"}>OR</Typography>
                <Button 
                variant="text"   fullWidth onClick={()=>setIsLogin(false)}>Sign up</Button>
            </form>

        </>:<>
            <Typography variant="h5">Sign up</Typography>
            <form style={
                {
                    width:"100%",
                    marginTop:"1rem"
                }
            }>
                <Stack position={"relative  "} width={"10rem"} margin={"auto"} >
                    
                <Avatar src={avatar.preview} sx={
                    {
                        width:"10rem",
                        height:"10rem",
                        objectFit:"contain"
                    }
                }/>
                {
                    avatar.error && <Typography color={"error"} variant="caption">{avatar.error}</Typography>
                }

                <IconButton component="label" sx={
                    {
                        position:"absolute",
                        bottom:0,
                        right:0,
                        
                    }
                }>
                    <>
                    <CameraAlt></CameraAlt>
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                    </>
                </IconButton>
                </Stack>
                
                <TextField required fullWidth label="Name" margin="normal" variant="outlined" value={name.value} onChange={name.changeHandler}></TextField>
                <TextField required fullWidth label="Bio" margin="normal" variant="outlined" value={bio.value} onChange={bio.changeHandler}></TextField>
                <TextField required fullWidth label="Username" margin="normal" variant="outlined" value={username.value} onChange={username.changeHandler} ></TextField>
                {
                    username.error && <Typography color={"error"} variant="caption">{username.error}</Typography>
                }
                <TextField required fullWidth label="password" margin="normal" variant="outlined" type="password" value={password.value} onChange={password.changeHandler}></TextField>
                {
                    password.error && <Typography color={"error"} variant="caption">{password.error}</Typography>
                }
                <Button sx={
                    {
                        marginTop:"1rem"
                    }
                }
                variant="contained" color="primary" type="Submit" fullWidth onClick={(e)=>handleSubmit(e)}>Sign up</Button>

                <Typography  textAlign={"center"} m={"1rem"}>OR</Typography>
                <Button 
                variant="text"  type="Submit" fullWidth onClick={()=>setIsLogin(true)}>Login</Button>
            </form>

        </>}
        
        </Paper>        

    </Container>
}

export default Login;