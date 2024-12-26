import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Student({ userId }) {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Fetch all courses
    useEffect(() => {
        axios.get("http://localhost:3001/api/courses")
            .then((response) => setCourses(response.data))
            .catch((err) => console.error(err));
    }, []);

    // Fetch enrolled courses
    useEffect(() => {
        axios.get(`http://localhost:3001/api/user-course/${userId}`)
            .then((response) => setEnrolledCourses(response.data.courses))
            .catch((err) => console.error(err));
    }, [userId]);

    // Fetch details of a specific course
    const fetchCourseDetails = (courseId) => {
        axios.get(`http://localhost:3001/api/courses/${courseId}`)
            .then((response) => setSelectedCourse(response.data))
            .catch((err) => console.error(err));
    };

    // Enroll in a course
    const enrollInCourse = (courseId) => {
        axios.put(`http://localhost:3001/api/user-course/${userId}`, { courseId })
            .then((response) => {
                alert("Successfully enrolled!");
                setEnrolledCourses([...enrolledCourses, response.data]);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="container mt-4">
            <h1>Student Dashboard</h1>

            <h2>Available Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <button
                            className="btn btn-link"
                            onClick={() => fetchCourseDetails(course._id)}
                        >
                            {course.category} - {course.description}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedCourse && (
                <div>
                    <h2>Course Details</h2>
                    <p><strong>Title:</strong> {selectedCourse.category}</p>
                    <p><strong>Description:</strong> {selectedCourse.description}</p>
                    <p><strong>Instructor:</strong> {selectedCourse.instructorName}</p>
                    <h3>Chapters</h3>
                    <ul>
                        {selectedCourse.chapters.map((chapter) => (
                            <li key={chapter.id}>
                                {chapter.title} - {chapter.description}
                            </li>
                        ))}
                    </ul>
                    <h3>Quizzes</h3>
                    {selectedCourse.quizzes ? (
                        <ul>
                            {selectedCourse.quizzes.map((quiz, index) => (
                                <li key={index}>
                                    Quiz {index + 1}: {quiz.questions.length} questions
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No quizzes available</p>
                    )}
                    <button
                        className="btn btn-primary"
                        onClick={() => enrollInCourse(selectedCourse._id)}
                    >
                        Enroll in this course
                    </button>
                </div>
            )}

            <h2>Enrolled Courses</h2>
            <ul>
                {enrolledCourses.map((course) => (
                    <li key={course._id}>{course.category} - {course.description}</li>
                ))}
            </ul>
        </div>
    );
}
