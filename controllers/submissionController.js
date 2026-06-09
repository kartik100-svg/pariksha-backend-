import Submission from "../models/Submission.js";
import Question from "../models/Question.js";

export const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;

    let score = 0;

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);

      if (
        question &&
        question.correctAnswer === ans.selectedAnswer
      ) {
        score += question.marks;
      }
    }

    const submission = await Submission.create({
      studentId: req.user._id,
      assessmentId,
      answers,
      score,
    });

    res.status(201).json({
      message: "Assessment submitted successfully",
      score,
      submission,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMyResults = async (req, res) => {
    try {
      const results = await Submission.find({
        studentId: req.user._id,
      }).populate("assessmentId", "title type totalMarks");
  
      res.status(200).json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };