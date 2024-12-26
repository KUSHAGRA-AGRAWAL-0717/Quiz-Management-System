const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    questions: [
        {
            id: String,
            question: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswer: { type: String, required: true },
            marks: { type: Number, required: true },
        },
    ],
});

const QuizModel = mongoose.model("quiz_datas", quizSchema);
module.exports = QuizModel;