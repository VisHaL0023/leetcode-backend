import { Router } from "express";
import { CourseController } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/index.js";

const router = Router();

let courseController = new CourseController();

// Protected routes, need logged in to access it

router.get("/", courseController.getAllCourses);

router.post("/createCourse", authenticate, courseController.createCourse);

router.post("/getCourseDetails", courseController.getCourseDetails);

router.post("/searchCourse", courseController.searchCourse);

export default router;
