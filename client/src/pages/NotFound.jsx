import { Container,Paper,Typography,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const NotFound = ()=>{
    const navigate = useNavigate()
    return(
        <Container maxWidth="lg" sx={
            {
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                padding:5,
            }
        }>
            <Paper  elevation={3}  sx={
                {
                    height:"100vh",
                    padding:4,
                    width:"100%"
                }
            }>
               <Typography variant="h3">Page Not Found</Typography>
                <Button type="text" onClick={()=>navigate("/")}> Go to home page</Button>
                 <img src="" alt="" />
            </Paper>
        </Container>
    )
}


export default NotFound