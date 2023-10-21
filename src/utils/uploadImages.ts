import multer from "multer"
import path from "path";

class UploadImages {
    public storage: multer.StorageEngine;

    constructor() {
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/avatar');
              },
              filename: (req, file, cb) => {
                cb(null, file.fieldname + '_' + req.body.email + path.extname(file.originalname));
              },
        })
    }
}

const uploadImages = new UploadImages().storage;
const upload = multer({ storage: uploadImages });

export default upload;