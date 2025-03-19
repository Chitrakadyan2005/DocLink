import express from "express";
import { searchByImage, searchByText } from "../controllers/search.controller.js";

const router = express.Router();

router.post("/image", searchByImage);
router.post("/text", searchByText);

export default router;
