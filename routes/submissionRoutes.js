import express from "express";
import { submitAssessment , getMyResults,} from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitAssessment);
router.get("/my-results", protect, getMyResults);
export default router;