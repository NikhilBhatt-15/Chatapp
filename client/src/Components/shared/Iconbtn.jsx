import { Tooltip,IconButton } from "@mui/material";
import React from "react";


const Iconbtn = ({tooltip,icon,onClick})=>{
    return (
        <Tooltip title={tooltip}>
            <IconButton color="inherit" size="large" onClick={onClick}>
               {icon} 
            </IconButton>
        </Tooltip>
    )
}

export default Iconbtn;