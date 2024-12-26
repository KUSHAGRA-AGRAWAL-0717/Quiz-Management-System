import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function CreateQuiz(path,state) {
    const [numQuestions, setNumQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [quizTopic, setQuizTopic] = useState('');
    const [duration, setDuration] = useState(0);
    const navigate = useNavigate();
   

    const handleCreate = () => {
        if (!quizTopic.trim() || numQuestions <= 0 || duration <= 0) {
            alert('Please fill all the fields correctly.');
            return;
        }
        
        const newQuestions = Array.from({ length: numQuestions }, () => ({
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            marks: ''
        }));
        setQuestions(newQuestions);
    };

    const handleSubmit = () => {
        console.log("create",state)
        const quizData = { topic: quizTopic, duration, questions };
        axios.post(`http://localhost:3001/api/courses/${state.courseId}/quizzes`, quizData)
            .then(response => {
                if (response.data.success) {
                    alert("Quiz successfully created!");
                    navigate('/dashboard', { state });
                } else {
                    alert("Failed to create quiz. Try again.");
                }
            })
            .catch(error => console.error('Error creating quiz:', error));
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <label htmlFor="quizTopic" className="form-label">Quiz Topic:</label>
                <input
                    type="text"
                    id="quizTopic"
                    className="form-control"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="numQuestions" className="form-label">Number of Questions:</label>
                <input
                    type="number"
                    id="numQuestions"
                    className="form-control"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration (in minutes):</label>
                <input
                    type="number"
                    id="duration"
                    className="form-control"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    required
                />
            </div>
            <button onClick={handleCreate} className="btn btn-primary mb-4">Create Questions</button>
            {questions.map((q, i) => (
                <div key={i} className="mb-3">
                    <h5>Question {i + 1}:</h5>
                    <input
                        type="text"
                        placeholder="Enter question"
                        value={q.question}
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[i].question = e.target.value;
                            setQuestions(updatedQuestions);
                        }}
                        className="form-control mb-2"
                        required
                    />
                    {q.options.map((opt, j) => (
                        <input
                            key={j}
                            type="text"
                            placeholder={`Option ${j + 1}`}
                            value={opt}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[i].options[j] = e.target.value;
                                setQuestions(updatedQuestions);
                            }}
                            className="form-control mb-2"
                            required
                        />
                    ))}
                    <input
                        type="text"
                        placeholder="Correct Answer"
                        value={q.correctAnswer}
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[i].correctAnswer = e.target.value;
                            setQuestions(updatedQuestions);
                        }}
                        className="form-control mb-2"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Marks"
                        value={q.marks}
                        onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[i].marks = parseInt(e.target.value);
                            setQuestions(updatedQuestions);
                        }}
                        className="form-control mb-2"
                        required
                    />
                </div>
            ))}
            {questions.length > 0 && (
                <button onClick={handleSubmit} className="btn btn-success">Submit Quiz</button>
            )}
        </div>
    );
}
