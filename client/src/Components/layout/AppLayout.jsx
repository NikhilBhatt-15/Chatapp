// import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../shared/ChatList";
import { chats } from "../../constants/sampleData";
const AppLayout = ()=>(WrappedComponent)=>{

    return (props)=>{
        return (
            <>
                <Header/>
                <Grid container height={"100%"}>
                    <Grid item sm={4} md={3} sx={
                        {
                            display:{xs:"none", sm:"block"}
                        }
                    } height={"100%"} ><ChatList chats={chats} chatId={"1"}/>
                    </Grid>
                    <Grid item xs = {12} sm= {8} md={5} lg={6}  >{<WrappedComponent {...props}/>}
                    </Grid>
                    <Grid item md={4} lg={3} sx={
                        {
                            display:{ xs:"none", md:"block"},
                            padding:"2rem",
                            bgcolor:"rgba(0,0,0,0.85)",

                        }
                    } >Third</Grid>
                </Grid>
                
                
            </>
        )
    }
}

export default AppLayout;