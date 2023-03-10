import express from "express";
import {
  getAllCities,
  getCitiesByCountrycode,
} from "../controller/cityController.js";
import cityModel from "../models/cityModel.js";

const router = express.Router();

router.get("/all", getAllCities);
router.get("/:countryCode", getCitiesByCountrycode);

export default router;
