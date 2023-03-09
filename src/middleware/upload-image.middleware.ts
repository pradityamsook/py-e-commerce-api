import multer = require("multer")
import { nanoid } from 'nanoid'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/src/uploads/")
    },
    filename: function (req, file, cb) {
        const id = nanoid();
        const mimetype = file.mimetype;
        const splitMimetype = mimetype.split("/");
        const fileType = splitMimetype[splitMimetype.length - 1];
        const originalName = `${id}.${fileType}`;
        cb(null, originalName)
    }
})

const upload = multer({
    limits: {
        fileSize: 16 * 1024 * 1024
    },
    storage: storage
})

export { upload };


// export class UploadImageMiddleware {
//     // public storage(): any {
//     //     return multer.diskStorage({
//     //     destination: function(req, file, cb)  {
//     //         cb(null, process.cwd() + "/src/uploads/")
//     //     },
//     //     filename: function(req, file, cb)  {
//     //         cb(null, process.cwd() + "/src/uploads/")
//     //     }
//     // }
//     public upload = multer({

//         limits: {
//             fileSize: 16 * 1024 * 1024
//         },
//         // storage: storage
//     })
// }