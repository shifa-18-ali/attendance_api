import express from "express";
import { markAttendance } from "../controller/attendanceController";

const router = express.Router();

router.post("/mark-attendance", markAttendance);

export default router;
