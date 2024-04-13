import { Router } from "express";
import authRoutes from "./auth-routes.js";
import courseRoutes from "./course-routes.js";
import { InfoController } from "../../controllers/index.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/course", courseRoutes);

// Checking api is live
router.get("/info", InfoController.info);

export default router;
