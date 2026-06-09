import Interview from "../models/Interview.js";
import User from "../models/User.js";

export const createInterview = async (req, res) => {
  try {
    const { title, description, studentEmail, date, time } = req.body;

    const student = await User.findOne({ email: studentEmail });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const meetLink = "https://meet.google.com/test-link";

    const interview = await Interview.create({
      title,
      description,
      studentId: student._id,
      interviewerId: req.user._id,
      date,
      time,
      meetingLink: meetLink,
      status: "scheduled",
    });

    res.status(201).json({
      message: "Interview Scheduled Successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      studentId: req.user._id,
    }).sort({ date: 1, time: 1 });

    res.status(200).json({
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAdminInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      interviewerId: req.user._id,
    })
      .populate("studentId", "name email")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};