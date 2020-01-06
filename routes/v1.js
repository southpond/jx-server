import express from "express";
import CityHandle from "../controller/v1/cities";
import Captchas from "../controller/v1/captchas";
import SearchPlace from "../controller/v1/search";
import BaseComponent from "../prototype/baseComponent";

const baseHandle = new BaseComponent();
const router = express.Router();

router.get("/cities", CityHandle.getCity);
router.get("/cities/:id", CityHandle.getCityById);
router.post("/captchas", Captchas.getCaptchas);
router.get("/pois", SearchPlace.search);
router.post("/addimg", baseHandle.uploadImg);

export default router;
