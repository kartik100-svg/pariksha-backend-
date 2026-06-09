import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createInterview,
  getMyInterviews,
  getAdminInterviews,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", protect, createInterview);

router.get("/my", protect, getMyInterviews);

router.get("/admin", protect, getAdminInterviews);

export default router;