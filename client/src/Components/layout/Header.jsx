import React, {lazy, Suspense, useState} from "react";
import {useNavigate} from "react-router-dom";
import Title from "../shared/Title";
import {Box, AppBar, Toolbar, Typography, Backdrop} from "@mui/material";
import {ORANGE} from "../../constants/color";
import Iconbtn from "../shared/Iconbtn";
import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications
} from "@mui/icons-material";

const Header = () => {

    const navigate = useNavigate();
    const NewGroup = lazy(() => import("../shared/NewGroup"));
    const Search = lazy(() => import("../shared/Search"));
    const Notification = lazy(() => import("../shared/Notification"));
    const [isSearch, setIsSearch] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const handleMobile = () => {
        // open the mobile menu
        setIsMobile(true);

    }
    const handleSearch = () => {
        //     open the search dialog
        setIsSearch(true);
    }

    const handleAdd = () => {
        // open the add group dialog
        setIsAdd(true);
    }
    const handleLogout = () => {
        setIsLogout(true);
    }
    const handleNotification = () => {
        // open the notification dialog
        setIsNotification(true);
    }


    return (
        <>
            <Title title={"chat app"} description={"this is a chat app"}/>
            <Box sx={{flexGrow: 1}} height={"4rem"}>
                <AppBar position="static" sx={
                    {
                        bgcolor: ORANGE
                    }
                }>
                    <Toolbar>
                        <Typography variant="h6" sx={
                            {
                                display: {xs: "none", sm: "block"}
                            }
                        }>Chat App</Typography>

                        <Box sx={
                            {
                                display: {xs: "block", sm: "none"}
                            }
                        }>
                            <Iconbtn tooltip={"options"} icon={<MenuIcon/>} onClick={handleMobile}/>
                        </Box>
                        <Box sx={{flexGrow: 1}}></Box>
                        <Box>
                            <Iconbtn tooltip={"search"} icon={<SearchIcon/>} onClick={handleSearch}/>
                            <Iconbtn tooltip={"add group"} icon={<AddIcon/>} onClick={handleAdd}/>
                            <Iconbtn tooltip={"Manage Group"} icon={<GroupIcon/>} onClick={() => navigate("/group")}/>
                            <Iconbtn tooltip={"Notifications"} icon={<Notifications/>} onClick={handleNotification}/>
                            <Iconbtn tooltip={"Logout"} icon={<LogoutIcon/>} onClick={handleLogout}/>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open={true}/>}>
                        <Search/>
                    </Suspense>
                )
            }
            {
                isAdd && (
                    <Suspense fallback={<Backdrop open={true}/>}>
                        <NewGroup/>
                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<Backdrop open={true}/>}>
                        <Notification/>
                    </Suspense>
                )
            }

        </>
    )
}

export default Header;