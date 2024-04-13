import { Router } from "express";
import authRoutes from "./auth-routes.js";
import { InfoController } from "../../controllers/index.js";

const router = Router();

router.use("/auth", authRoutes);

// Checking api is live
router.get("/info", InfoController.info);

export default router;
