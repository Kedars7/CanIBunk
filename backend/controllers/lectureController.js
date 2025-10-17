const Lecture = require("../models/lectureModel.js");
const Subject = require("../models/subjectModel.js");

const addLecture = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { subjectId, date, conducted, attended } = req.body;
    if (!subjectId) {
      return res.status(400).json({
        message: "Subject should be selected",
      });
    }

    await Lecture.create({
      subjectId,
      userId,
      date,
      conducted,
      attended,
    });

    await Subject.findOneAndUpdate(
      { _id: subjectId, userId },
      { $inc: { totalConducted: conducted, totalAttended: attended } }
    );

    return res.status(201).json({
      message: "Lecture added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllLectures = async (req, res) => {
  try {
    const userId = req.user.userId;
    const lectures = await Lecture.find({ userId });

    if (!lectures || lectures.length === 0) {
      return res.status(404).json({
        message: "No lecture added yet",
      });
    }

    return res.status(200).json(lectures);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLecture = async (req, res) => {
  try {
    const userId = req.user.userId;
    const subjectId = req.params.id;
    const lectures = await Lecture.find({ subjectId, userId });

    if (!lectures || lectures.length === 0) {
      return res.status(404).json({
        message: "No lecture added yet",
      });
    }

    return res.status(200).json(lectures);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteLecture = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const userId = req.user.userId;
    
    const lecture = await Lecture.findOne({ _id: lectureId, userId });

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    // Update subject totals by decrementing
    await Subject.findOneAndUpdate(
      { _id: lecture.subjectId, userId },
      { 
        $inc: { 
          totalConducted: -lecture.conducted, 
          totalAttended: -lecture.attended 
        } 
      }
    );

    // Delete the lecture
    await Lecture.findByIdAndDelete(lectureId);

    return res.status(200).json({
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addLecture, getAllLectures, getLecture, deleteLecture };
