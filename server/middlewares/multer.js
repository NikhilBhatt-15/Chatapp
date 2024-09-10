import multer from 'multer';

export const upload = multer({
    limits:{
        fileSize:1024*1024*5
    },
})

export const singleUpload =upload.single('avatar');
export const attachmentsUpload = upload.array('files',10);