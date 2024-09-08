import { Button, Container, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useInputValidation} from "../../hooks/forms.jsx";
import {passwordValidator, usernameValidator} from "../../utils/Validator.js";
import {Navigate} from "react-router-dom";


const AdminLogin = ()=>{
    const [isLogin,setIsLogin] = useState(true);
    const username = useInputValidation("",usernameValidator);
    const password = useInputValidation("",passwordValidator);
    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log("submitted");
    }
    if (isLogin)  return <Navigate to={"/admin/dashboard"}/>
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
        ><>
                <Typography variant="h5"> Admin Login</Typography>
                <form style={
                    {
                        width:"100%",
                        marginTop:"1rem"
                    }
                } onSubmit={handleSubmit}>
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
                </form>

            </>

        </Paper>

    </Container>
}


export default AdminLogin;