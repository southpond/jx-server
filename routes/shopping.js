import express from "express";
// import Activity from "../controller/shopping/activity";
import Shop from "../controller/shopping/shop";

const router = express.Router();

router.post("/addshop", Shop.addShop);
router.get("/restaurants", Shop.getRestaurants);
// router.post("/add", Activity);
// router.get("/", Activity);

export default router;
