const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  conducted: {
    type: Number,
    default: 0,
  },
  attended: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Lecture", LectureSchema);
