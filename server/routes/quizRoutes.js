// const express = require("express");
// const QuizModel = require("../models/Quiz");
// const router = express.Router();

// // Quiz Routes
// router.post("/courses/:courseId/quizzes", (req, res) => {
//     const { courseId } = req.params;
//     const quizData = { ...req.body, courseId };

//     QuizModel.create(quizData)
//         .then(quiz => res.status(201).json(quiz))
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// router.get("/courses/:courseId/quizzes", (req, res) => {
//     QuizModel.find({ courseId: req.params.courseId })
//         .then(quizzes => res.json(quizzes))
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// router.get("/quizzes/:id", (req, res) => {
//     QuizModel.findById(req.params.id)
//         .then(quiz => {
//             if (quiz) res.json(quiz);
//             else res.status(404).json({ error: "Quiz not found" });
//         })
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// router.put("/quizzes/:id", (req, res) => {
//     QuizModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(quiz => res.json(quiz))
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// router.delete("/quizzes/:id", (req, res) => {
//     QuizModel.findByIdAndDelete(req.params.id)
//         .then(() => res.status(204).send())
//         .catch(err => res.status(500).json({ error: err.message }));
// });

// module.exports = router; // Ensure this line is present

const express = require("express");
const QuizModel = require("../models/Quiz");
const MarkModel = require("../models/Mark"); // Import the Marks model
const router = express.Router();

// Quiz Routes
//to create course quiz
router.post("/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const quizData = { ...req.body, courseId };

    QuizModel.create(quizData)
        .then(quiz => res.status(201).json(quiz))
        .catch(err => res.status(500).json({ error: err.message }));
});

//to get the course quizzes
router.get("/courses/:courseId/quizzes", (req, res) => {
    QuizModel.find({ courseId: req.params.courseId })
        .then(quizzes => res.json(quizzes))
        .catch(err => res.status(500).json({ error: err.message }));
});

//to get an specific quizz
router.get("/quizzes/:id", (req, res) => {
    QuizModel.findById(req.params.id)
        .then(quiz => {
            if (quiz) res.json(quiz);
            else res.status(404).json({ error: "Quiz not found" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

//to update an specific quiz
router.put("/quizzes/:id", (req, res) => {
    QuizModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(quiz => res.json(quiz))
        .catch(err => res.status(500).json({ error: err.message }));
});

//to delete an specific quiz
router.delete("/quizzes/:id", (req, res) => {
    QuizModel.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json({ error: err.message }));
});

// New route to check if a quiz has been attempted
router.post("/quizzes/check-attempt", (req, res) => {
    const { email, topic } = req.body;

    // Check if the quiz has been attempted by the user
    MarkModel.findOne({ email, topic })
        .then(attempt => {
            if (attempt) {
                res.json({ attempted: true });
            } else {
                res.json({ attempted: false });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// New route to save quiz results
router.post("/quiz-results", (req, res) => {
    const { topic, name, email, dept, score, answers } = req.body;

    const markData = {
        topic,
        name,
        email,
        dept,
        score,
        answers,
    };

    MarkModel.create(markData)
        .then(() => res.status(201).json({ message: "Quiz results saved successfully" }))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router; // Ensure this line is present