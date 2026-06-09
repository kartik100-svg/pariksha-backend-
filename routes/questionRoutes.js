import express from "express";

import {
  createQuestion,
  getQuestionsByAssessment,
} from "../controllers/questionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createQuestion);

router.get(
  "/:assessmentId",
  protect,
  getQuestionsByAssessment
);

export default router;