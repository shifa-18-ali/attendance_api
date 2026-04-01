import { Router } from "express";
import { getAdminDashboard } from "../controller/admin.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/dashboard", requireAdmin, getAdminDashboard);

export default router;
