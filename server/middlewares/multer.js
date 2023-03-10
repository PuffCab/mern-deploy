import multer from "multer";
import path from "path";
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  let extension = path.extname(file.originalname);
  if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    cb(null, false); //NOTE this won't produce an error, but won't upload the file and server will keep on running.
    //   cb(new Error("sorry the file format is not allowed"), false); //NOTE if we generate a new error, will be displayed in the terminal, but will produce an error in the server, stopping it
  }
  // To accept the file pass `true`, like so:
  cb(null, true);
};

const multerUpload = multer({
  storage,
  fileFilter,
});

export { multerUpload };
