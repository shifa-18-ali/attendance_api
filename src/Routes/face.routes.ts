import express from "express";
import { recognizeFace } from "../controller/face.controller";

const router = express.Router();

router.post("/recognize-face", recognizeFace);

export default router;
