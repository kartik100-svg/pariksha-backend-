import Assessment from "../models/Assessment.js";

export const createAssessment = async (req, res) => {
    try {
  
      console.log("BODY:", req.body);
  
      const { title, description, type, duration, totalMarks } = req.body;
  
      const assessment = await Assessment.create({
        title,
        description,
        type,
        duration,
        totalMarks,
        createdBy: req.user._id,
      });
  
      res.status(201).json({
        message: "Assessment created successfully",
        assessment,
      });
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message,
      });
  
    }
  };

export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();

    res.status(200).json({
      assessments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};