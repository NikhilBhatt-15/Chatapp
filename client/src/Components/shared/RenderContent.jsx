import {transformImage} from "../../lib/Features.js";
import {FileOpen} from "@mui/icons-material";

const RenderContent = ({ file,url }) => {

    switch (file){
        case "video":
            return (<video src={url} controls={true} width={"100%"} height={"auto"}></video>)
            break;
        case "image":
            return (<img src={transformImage(url)} alt={"attachment"} width={"300px"} height={"auto"} style={{
                objectFit:"contain"
            }}/>)
            break;
        case "audio":
            return (<audio src={url} controls={true}></audio>)


            break;
        default:
            return (<FileOpen/>)

    }

}

export default RenderContent;

