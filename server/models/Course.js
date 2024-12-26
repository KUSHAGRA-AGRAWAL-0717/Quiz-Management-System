// const mongoose = require("mongoose");

// const chapterSchema = new mongoose.Schema({
//     id: String,
//     title: String,
//     content: String,
//     description: String,
//     videoLink: String,
//     duration: Number,
// });

// const courseSchema = new mongoose.Schema({
//     category: String,
//     chapters: [chapterSchema],
//     description: String,
//     duration: Number,
//     instructorName: String,
//     language: String,
//     level: String,
//     price: Number,
//     status: String,
//     visibility: String,
// });

// const CourseModel = mongoose.model("courses", courseSchema);
// module.exports = CourseModel;


const mongoose = require("mongoose");

// Chapter Schema
const chapterSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    content: { type: String },
    description: { type: String },
    videoLink: { type: String },
    duration: { type: Number },
});

// Course Schema with Quiz References
const courseSchema = new mongoose.Schema({
    category: { type: String, required: true },
    chapters: [chapterSchema],
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "quiz_datas", // Reference to Quiz Model
        },
    ],
    description: { type: String, required: true },
    duration: { type: Number },
    instructorName: { type: String, required: true },
    language: { type: String },
    level: { type: String },
    price: { type: Number },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    visibility: { type: String, enum: ["public", "private"], default: "public" },
});

const CourseModel = mongoose.model("courses", courseSchema);
module.exports = CourseModel;
