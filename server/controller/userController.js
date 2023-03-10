import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { passwordEncryption, verifyPassword } from "../utils/bcrypt.js";
import generateToken from "../utils/jwt.js";

const imageUpload = async (req, res) => {
  console.log("req.file :>> ", req.file);
  console.log("req.body>>>>", req.body);

  try {
    const pictureUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "elephants",
    });
    console.log("pictureUpload :>> ", pictureUpload);
    res.status(200).json({
      msg: "hurrrayyy, you did it!",
      userPicture: pictureUpload.url,
    });
  } catch (error) {
    res.status(400).json({
      msg: "sorry, upload went wrong",
    });
  }
};

const signup = async (req, res) => {
  console.log("req.body", req.body);
  const { userName, email, password, userPicture } = req.body; // destructured version (be careful with undefined/null fields)

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser :>> ", existingUser);

    if (existingUser) {
      res.status(500).json({
        msg: "ups, email already in use....you might have an account and forgot",
      });
    } else {
      const hashedPassword = await passwordEncryption(req.body.password);
      console.log("hashedPassword", hashedPassword);
      // VALIDATE email/passsword in the backend too, before saving it - express validator
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        userPicture: req.body.userPicture,
        // user roleS? do it here
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          msg: "signup successful",
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            userPicture: savedUser.userPicture,
          },
        });
      } catch (error) {
        res.status(400).json({ msg: "error during signup", error: error });
      }
    }
  } catch (error) {
    console.log("error registering user", error);
  }
};

const login = async (req, res) => {
  console.log("req.body", req.body);

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(401).json({ msg: "wrong email" });
    } else {
      // verify or check user's password

      const isPasswordMatch = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({ msg: "hey you ...this is not your password" });
      } else {
        // email exists and password is correct

        const token = generateToken(existingUser._id);

        console.log("token", token);

        res.status(200).json({
          msg: "you are logged in!!!",
          user: {
            id: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.email,
            userPicture: existingUser.userPicture,
          },
          token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

const getProfile = async (req, res) => {
  console.log("req.user>>>", req.user);

  res.status(200).json({
    user: {
      userName: req.user.userName,
      email: req.user.email,
      userPicture: req.user.userPicture,
    },
  });
};
export { imageUpload, signup, login, getProfile };
