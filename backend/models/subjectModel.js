const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    criteria: {
        type: Number,
        default: 75
    },
    totalConducted: {
        type: Number,
        default: 0
    },
    totalAttended: {
        type: Number,
        default: 0 
    },
    createdAt: {
        type: Date, 
        default: Date.now 
    }
})

module.exports = mongoose.model("Subject", SubjectSchema);