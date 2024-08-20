
export const fileFormat = (url="")=>{
    const fileExtension = url.split(".").pop();
    if(fileExtension =="mp4" ||fileExtension=="webm" || fileExtension=="ogg"){
        return "video";
    }
    if(fileExtension=="pdf"){
        return "pdf";
    }
    if(fileExtension=="doc" || fileExtension=="docx"){
        return "doc";
    }
    if(fileExtension=="xls" || fileExtension=="xlsx"){
        return "xls";
    }
    if(fileExtension=="ppt" || fileExtension=="pptx"){
        return "ppt";
    }
    if(fileExtension=="zip" || fileExtension=="rar"){
        return "zip";
    }
    if(fileExtension=="txt"){
        return "txt";
    }
    if(fileExtension=="jpg" || fileExtension=="jpeg" || fileExtension=="png" || fileExtension=="gif"){
        return "image";
    }
    if(fileExtension=="mp3" || fileExtension=="wav" || fileExtension=="ogg"){
        return "audio";
    }
    return "file";
}

export const transformImage = (image)=>{
    return image;
}