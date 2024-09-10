import multer from 'multer';

// files size limit is 5mb





export const upload = multer({
    limits:{
        fileSize:1024*1024*100
    },
})

export const singleUpload =upload.single('avatar');
export const attachmentsUpload = upload.array('files',10);