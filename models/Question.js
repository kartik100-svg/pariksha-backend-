import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment",
  },

  questionText: {
    type: String,
    required: true,
  },

  options: [String],

  correctAnswer: {
    type: String,
  },

  marks: {
    type: Number,
    default: 1,
  },

  type: {
    type: String,
    enum: ["mcq", "coding"],
    default: "mcq",
  },

}, {
  timestamps: true,
});

const Question = mongoose.model(
  "Question",
  questionSchema
);

export default Question;