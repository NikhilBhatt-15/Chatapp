import {Box,  Drawer, Grid, IconButton, Stack, Typography} from "@mui/material";
import {Link} from "../../styles/StyledComponents.jsx";
import {
    Close as CloseIcon,
    Dashboard as DashboardIcon,
    Groups as GroupsIcon,
    ManageAccounts as ManageAccountsIcon,
    Menu as MenuIcon, Message as MessageIcon
} from "@mui/icons-material";
import { useState} from "react";
import {useLocation} from "react-router-dom";
const Sidebar =({w="100%"})=>{
    const AdminTabs =[
        {
            name:"Dashboard",
            path:"admin/dashboard",
            icon:<DashboardIcon/>
        },{
            name:"Users",
            path:"admin/user-management",
            icon:<ManageAccountsIcon/>
        },{
            name:"Groups",
            path:"admin/group-management",
            icon:<GroupsIcon/>
        },{
            name:"Messages",
            path:"admin/message-management",
            icon:<MessageIcon/>
        },

    ]
    const location = useLocation();
    return (
        <Stack minHeight={"100vh"} sx={{
            backgroundColor: "#f0f0f0",
        }} width={w} p={"2rem"} spacing={"1rem"}>
            <Typography variant={"h4"}>Admin</Typography>
            <Stack spacing={"2rem"}>
                {
                    AdminTabs.map((tab,index)=>(
                        <Link key={index} to={tab.path}
                        sx={{
                            color:location.pathname==tab.path?"#000":"#777",
                            backgroundColor:location.pathname==tab.path?"black":"transparent",
                            "&:hover":{
                                color:"#000"}
                        }}
                        >
                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                {tab.icon}
                                <Typography variant={"h6"} >{tab.name}</Typography>
                            </Stack>
                        </Link>
                    ))
                }
            </Stack>
        </Stack>
    )
}
const  AdminLayout = ({children}) => {
    const [isMobile,setIsMobile] = useState(false);
    const handleMobile =()=>{
        setIsMobile((prev)=>!prev);
    }
    return (
        <Grid container={true} minHeight={"100vh"}>
            <Box
                sx={{
                    display:{
                        xs:"block",
                        md:"none"
                    },
                    position:"fixed",
                    top:"1rem",
                    right:"1rem",
                }}
            >
                <IconButton onClick={handleMobile} size={"large"}>
                    {isMobile?<CloseIcon fontSize={"large"}/>: <MenuIcon fontSize={"large"}/> }
                </IconButton>
            </Box>
            <Grid item={true}
                  md={4}
                  lg={3}
                  sx={{
                      display:{
                          xs:"none",
                          md:"block"
                        }
                  }}
            >
                <Sidebar/>
            </Grid>
            <Grid item={true} xs={12} md={8} lg={9}>
                {children}
            </Grid>
            <Drawer open={isMobile} onClose={handleMobile}>
                <Sidebar w={"50vw"}/>
            </Drawer>
        </Grid>
    )
}

export default AdminLayout;