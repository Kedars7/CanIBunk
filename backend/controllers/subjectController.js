const Subject = require("../models/subjectModel.js");
const Lecture = require("../models/lectureModel.js");

const addSubject = async (req, res) => {
  try {
    const { name, criteria = 75, totalConducted = 0, totalAttended = 0 } = req.body;
    const userId = req.user.userId;

    if (!name) {
      return res.status(400).json({
        message: "Subject name is required",
      });
    }

    const sub = await Subject.findOne({ name, userId });
    if (sub) {
      return res.status(400).json({
        message: "Subject already exist",
      });
    }

    await Subject.create({
      userId,
      name,
      criteria,
      totalConducted,
      totalAttended,
    });

    return res.status(201).json({
      message: "Subject added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const userId = req.user.userId;

    // await the query to get the actual documents
    const allSubjects = await Subject.find({ userId });

    if (!allSubjects || allSubjects.length === 0) {
      return res.status(400).json({
        message: "No subject added",
      });
    }

    // return the array of subjects
    return res.status(200).json(allSubjects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getSingleSubject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const subjectId = req.params.id;
    const subject = await Subject.findOne({ _id: subjectId, userId });

    if (!subject) {
      return res.status(400).json({
        message: "Subject does not exist",
      });
    }

    return res.status(200).json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const subjectId = req.params.id;
    const subject = await Subject.findOneAndDelete({ _id: subjectId, userId });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    // Delete all lectures associated with this subject
    await Lecture.deleteMany({ subjectId, userId });

    return res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const updateSubject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const subjectId = req.params.id;

    const { name, criteria, totalConducted, totalAttended } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (criteria !== undefined) updateData.criteria = criteria;
    if (totalConducted !== undefined) updateData.totalConducted = totalConducted;
    if (totalAttended !== undefined) updateData.totalAttended = totalAttended;

    const subject = await Subject.findOneAndUpdate(
      { _id: subjectId, userId },   
      { $set: updateData },        
      { new: true }               
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json({
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSubject,
  getAllSubjects,
  getSingleSubject,
  deleteSubject,
  updateSubject
};
