import mongoose from "mongoose";

const codingSubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },

    language: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    input: {
      type: String,
      default: "",
    },

    output: {
      type: String,
    },

    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CodingSubmission = mongoose.model(
  "CodingSubmission",
  codingSubmissionSchema
);

export default CodingSubmission;