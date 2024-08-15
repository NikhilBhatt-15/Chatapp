import {Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography} from "@mui/material";
import {notifications as notificationsList} from "../../constants/sampleData.js";
import {memo} from "react";

const Notification = ()=>{
    const notifications = notificationsList;
    return(
        <Dialog open={true}>
            <DialogTitle align={"center"} variant={"h4"}>Notifications</DialogTitle>
            <Stack  p={{
                xs:"1rem",
                sm:"2rem"
            }} maxWidth={"35rem"}>
                {
                    notifications.length>0?(
                        notifications.map((notification,index)=>(
                            <NotificationItem notification={notification} key={index} />
                        ))

                    ):(<Typography textAlign={"center"}>0 Notifications </Typography>)
                }
            </Stack>
        </Dialog>
    )
}

const NotificationItem = memo(({notification})=>{
    const {id,sender} = notification;
    return(
        <>
            <ListItem>
                <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} width={"100%"}>
                    <Avatar src={sender.avatar}/>
                    <Typography
                        variant={"body1"}
                        sx={{
                            flexGrow:1,
                            display:"-webkit-box",
                            WebkitBoxOrient:"vertical",
                            WebkitLineClamp:1,
                            overflow:"hidden",
                            textOverflow:"ellipsis",
                        }}


                    >{`${sender.name} sent you a friend request`}</Typography>
                    <Stack direction={{xs:"column",sm:"row"}}>
                        <Button>Accept</Button>
                        <Button color={"error"}>Reject</Button>
                    </Stack>
                </Stack>
            </ListItem>
        </>
    )
})

export default Notification