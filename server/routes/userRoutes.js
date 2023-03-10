import express from "express";
import {
  getProfile,
  imageUpload,
  login,
  signup,
} from "../controller/userController.js";
import jwt from "../middlewares/jwt.js";
import { multerUpload } from "../middlewares/multer.js";
const router = express.Router();

router.get("/profile", jwt, getProfile);
router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/signup", signup);
router.post("/login", login);

export default router;
