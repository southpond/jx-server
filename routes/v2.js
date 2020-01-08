import express from "express";
import User from "../controller/v2/user";
import Entry from "../controller/v2/entry";

const router = express.Router();

router.get("/index_entry", Entry.getEntry);
router.post("/login", User.login);

export default router;
