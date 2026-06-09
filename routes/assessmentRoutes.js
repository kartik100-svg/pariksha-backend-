import express from "express";
import {
  createAssessment,
  getAssessments,
} from "../controllers/assessmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createAssessment);
router.get("/", protect, getAssessments);

export default router;