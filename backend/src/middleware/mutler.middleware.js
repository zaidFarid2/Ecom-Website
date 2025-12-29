import multer from "multer"
import path from "path"

const storage = multer({
    filename: (req,file,cb)=>{
        cb( null,`${Date.now()}-${file.originalname}` )
    }
})

// filterfile: jpeg,png,webg,jpg

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  cb(ext && mime ? null : new Error("Invalid file type"), ext && mime);
};

export const upload = multer({
    storage,fileFilter,limits:{fileSize:5*1024*1024} // 5mb limit 
})