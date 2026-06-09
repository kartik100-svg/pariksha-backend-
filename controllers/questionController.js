import Question from "../models/Question.js";

export const createQuestion = async (req, res) => {
  try {
    console.log("QUESTION BODY:", req.body);

    const question = await Question.create(req.body);

    res.status(201).json({
      message: "Question created successfully",
      question,
    });

  } catch (error) {
    console.log("QUESTION ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getQuestionsByAssessment = async (req, res) => {
  try {
    const questions = await Question.find({
      assessmentId: req.params.assessmentId,
    });

    res.status(200).json({
      questions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};