import express from "express";
import CityHandle from "../controller/v1/cityies";
import Captchas from "../controller/v1/captchas";
import SearchPlace from "../controller/v1/search";

const router = express.Router();

router.get("/cities", CityHandle.getCity);
router.get("/cities/:id", CityHandle.getCityById);
router.post("/captchas", Captchas.getCaptchas);
router.get("/pois", SearchPlace.search);

export default router;
