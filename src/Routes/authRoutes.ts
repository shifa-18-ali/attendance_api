import express from "express";
import { registerAdmin, registerEmployee, loginUser } from "../controller/authController";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/register-employee", registerEmployee);
router.post("/login", loginUser);

export default router;
