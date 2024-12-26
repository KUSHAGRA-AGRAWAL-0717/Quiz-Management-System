const express = require("express");
const CourseModel = require("../models/Course");
const router = express.Router();

//course creation
router.post("/courses", (req, res) => {
    CourseModel.create(req.body)
        .then(course => res.status(201).json(course))
        .catch(err => res.status(500).json({ error: err.message }));
});

//courses get
router.get("/courses", (req, res) => {
    CourseModel.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json({ error: err.message }));
});

//particular course fetch
router.get("/courses/:id", (req, res) => {
    CourseModel.findById(req.params.id)
        .then(course => {
            if (course) res.json(course);
            else res.status(404).json({ error: "Course not found" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

//update in the course
router.put("/courses/:id", (req, res) => {
    CourseModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(course => res.json(course))
        .catch(err => res.status(500).json({ error: err.message }));
});

//deletion in the course
router.delete("/courses/:id", (req, res) => {
    CourseModel.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router; // Ensure this line is present