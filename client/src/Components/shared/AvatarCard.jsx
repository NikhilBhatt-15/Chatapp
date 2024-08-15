import {Avatar, AvatarGroup, Box, Stack} from "@mui/material";

const AvatarCard = ({ avatar = [] ,max=4}) => {
  return (
    <>
        <Stack direction={"row"} spacing ={0.5}>
            <AvatarGroup max={max}>
                <Box width={"5rem"} height={"3rem"}>
                    {

                        avatar.map((url,index)=>{
                            if(index>=max) return null;
                            return <Avatar key={index} src={url} alt="avatar" sx={{width:"3rem",height:"3rem",position:"absolute" ,left:{
                                    xs:`${0.5+index}rem`,
                                    sm:`${index}rem`,
                                } }}/>
                        })
                    }
                </Box>
            </AvatarGroup>

        </Stack>
    </>
  );
}

export default AvatarCard;