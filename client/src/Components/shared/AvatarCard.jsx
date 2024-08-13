import {Avatar, AvatarGroup, Box, Stack} from "@mui/material";

const AvatarCard = ({ avatar = [] ,max=4}) => {
  return (
    <>
        <Stack direction={"row"} spacing ={0.5}>
            <AvatarGroup max={max}>
                <Box width={"5rem"} height={"3rem"}>
                    {
                        avatar.map((url,index)=>{
                            return <Avatar key={index} src={url} alt="avatar" style={{width:"3rem",height:"3rem",position:"absolute" ,left:{
                                    xs:`${index+0.5}rem`,
                                    sm:`${index}rem`,
                                } }}/>
                        });
                    }
                </Box>

            </AvatarGroup>

        </Stack>
    </>
  );
}

export default AvatarCard;