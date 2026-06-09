import Assessment from "../models/Assessment.js";
import Interview from "../models/Interview.js";
import Submission from "../models/Submission.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const assessments = await Assessment.countDocuments();

    const interviews = await Interview.countDocuments({
      studentId: userId,
    });

    const completed = await Submission.countDocuments({
      studentId: userId,
    });

    const submissions = await Submission.find({
      studentId: userId,
    }).populate("assessmentId");

    let performance = 0;

    if (submissions.length > 0) {
      const totalScore = submissions.reduce(
        (sum, item) => sum + item.score,
        0
      );

      const totalMarks = submissions.reduce(
        (sum, item) => sum + (item.assessmentId?.totalMarks || 0),
        0
      );

      performance = totalMarks > 0
        ? Math.round((totalScore / totalMarks) * 100)
        : 0;
    }

    res.status(200).json({
      message: "Dashboard Data",
      user: req.user,
      stats: {
        assessments,
        interviews,
        performance: `${performance}%`,
        completed,
      },
      recentAssessments: submissions,
      upcomingInterviews: await Interview.find({
        studentId: userId,
        status: "scheduled",
      }),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};