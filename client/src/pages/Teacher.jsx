import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateQuiz from './CreateQuiz'; // Import CreateQuiz component

export default function Teacher() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    // Fetch all courses
    useEffect(() => {
        axios.get("http://localhost:3001/api/courses")
            .then((response) => setCourses(response.data))
            .catch((err) => console.error(err));
    }, []);

    // Fetch quizzes for a specific course
    const fetchQuizzes = (courseId) => {
        axios.get(`http://localhost:3001/api/courses/${courseId}/quizzes`)
            .then((response) => setQuizzes(response.data))
            .catch((err) => console.error(err));
    };

    // Fetch specific quiz details
    const fetchQuizDetails = (quizId) => {
        axios.get(`http://localhost:3001/api/quizzes/${quizId}`)
            .then((response) => alert(JSON.stringify(response.data, null, 2)))
            .catch((err) => console.error(err));
    };

    return (
        <div className="container mt-4">
            <h1>Teacher Dashboard</h1>

            <h2>My Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        {course.category} - {course.description}
                        <button
                            className="btn btn-info ms-3"
                            onClick={() => { setSelectedCourse(course); fetchQuizzes(course._id); }}
                        >
                            View Quizzes
                        </button>
                    </li>
                ))}
            </ul>

            {selectedCourse && (
                <div>
                    <h3>Quizzes for {selectedCourse.category}</h3>
                    <ul>
                        {quizzes.map((quiz) => (
                            <li key={quiz._id}>
                                <button
                                    className="btn btn-link"
                                    onClick={() => fetchQuizDetails(quiz._id)}
                                >
                                    Quiz {quiz._id}: {quiz.questions.length} questions
                                </button>
                                <button
                                    className="btn btn-danger ms-3"
                                    onClick={() => {
                                        axios.delete(`http://localhost:3001/api/quizzes/${quiz._id}`)
                                            .then(() => {
                                                alert("Quiz deleted successfully");
                                                fetchQuizzes(selectedCourse._id); // Refresh quizzes after deletion
                                            })
                                            .catch((err) => console.error(err));
                                    }}
                                >
                                    Delete Quiz
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h4>Create a Quiz for {selectedCourse.category}</h4>
                    {/* Use the CreateQuiz component for quiz creation */}
                    <CreateQuiz state={{ ...selectedCourse }} />
                </div>
            )}
        </div>
    );
}
