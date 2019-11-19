import express from "express";
import CityHandle from "../controller/v1/cityies";
import Captchas from '../controller/v1/captchas'

const router = express.Router();

router.get("/cities", CityHandle.getCity);
router.get("/cities/:id", CityHandle.getCityById);
router.post('/captchas', Captchas.getCaptchas);

export default router;
