import {Box, Container, Typography} from "@mui/material";
import AppLayout from "../Components/layout/AppLayout";

const Home = ()=>{
    return(
        <>

            <Box  height={"100%"} width={"100%"}  bgcolor={"#343a40"} sx={
                {
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",

                }
            }>
                <Box>
                    <Typography variant={"h4"} textAlign={"center"} color={"#f8f9fa"}>Welcome to Chit n Chat</Typography>
                    <Typography p={"2rem"} variant={"h5"} textAlign={"center"} color={"#6c757d"}>Select a chat to start messaging</Typography>
                </Box>

            </Box>



        </>
    )
}
 const HomeWithLayout = AppLayout()(Home);
export default HomeWithLayout;