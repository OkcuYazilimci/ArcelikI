import multer from "multer";
import path from "path";
// import uuid from "uuid/v4";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).single("image");

// // Check file Type
export function checkFileType(file, cb) {

  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}