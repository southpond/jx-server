import express from "express";
import Activity from "../controller/shopping/activity";

const router = express.Router();

router.post("/add", Activity);
router.get("/", Activity);

export default router;
