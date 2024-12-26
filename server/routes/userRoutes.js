const express = require("express");
const UserModel = require("../models/User");
const router = express.Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({
                        message: "Success",
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        dept: user.dept,
                    });
                } else {
                    res.status(400).json({ message: "Incorrect password" });
                }
            } else {
                res.status(404).json({ message: "User  not found" });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.post("/register", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.put("/user-course/:userId", (req, res) => {
    const { userId } = req.params;
    const { courses } = req.body; // Expecting an array of course IDs

    if (!Array.isArray(courses)) {
        return res.status(400).json({ message: "Courses should be an array of course IDs." });
    }

    UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { courses: { $each: courses } } }, // Use $addToSet to avoid duplicates
        { new: true } // Return the updated document
    )
        .then(updatedUser  => {
            if (!updatedUser ) {
                return res.status(404).json({ message: "User  not found" });
            }
            res.json({
                message: "Courses updated successfully",
                updatedCourses: updatedUser .courses,
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get("/user-course/:userId", (req, res) => {
    const { userId } = req.params;

    UserModel.findById(userId)
        .populate("courses") // Populate the courses field with course details
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User  not found" });
            }
            res.json({
                message: "Courses retrieved successfully",
                courses: user.courses, // Return the populated courses
            });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router; // Ensure this line is present