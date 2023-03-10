import express from "express";
import { getAllAttractions } from "../controller/attractionController.js";
const router = express.Router();

router.get("/all", getAllAttractions);

export default router;
