import {Avatar, Icon, Stack, Typography} from "@mui/material";
import {Face as FaceIcon,AlternateEmail as UsernameIcon,CalendarMonth as CalendarIcon} from "@mui/icons-material";
import moment from "moment";
const ProfileCard = ({text, icon, heading}) => {
    return (
        <Stack direction={"row"} spacing={"1rem"} alignItems={"start"} color={"white"} textAlign={"center"}>
            {icon && <Icon component={icon} />}
            <Stack>
                <Typography  varient="body1" align={"center"}>{text}</Typography>
                <Typography varient="caption" color={"grey"} align={"center"}>{heading}</Typography>
            </Stack>
        </Stack>
    );
}
const Profile = () => {
    return  (
        <Stack direction={"column"} spacing={"2rem"} alignItems={"center"}>
            <Avatar sx={{
                width:"10rem",
                height:"10rem",
                objectFit:"contain",
                marginBottom:"1rem",
                marginTop:"1rem",
                border:"5px solid white"
            }
            }
            />
            <ProfileCard heading={"Bio"} text={"chit n chat"} />
            <ProfileCard heading={"Username"} text={"tylerdurden"} icon={UsernameIcon}/>
            <ProfileCard heading={"Name"} text={"Tyler Durden"} icon={FaceIcon}/>
            <ProfileCard heading={"Joined"} text={moment('2024-04-04T18:30:00.000Z').fromNow()} icon={CalendarIcon}/>
        </Stack>
    );
}


export default Profile;