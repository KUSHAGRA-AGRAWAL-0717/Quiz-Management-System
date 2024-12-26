import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Attempt() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { topic, name, email, role, dept } = state;
    const [questions, 
    setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [evaluationResults, setEvaluationResults] = useState([]);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/quizzes/${topic}`)
            .then(response => {
                const { duration, questions } = response.data;
                setDuration(duration);
                setQuestions(questions);
                const initialAnswers = {};
                questions.forEach((_, index) => {
                    initialAnswers[index] = '';
                });
                setAnswers(initialAnswers);
                setTimeLeft(duration * 60);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, [topic]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        if (timeLeft === 0 || showCorrectAnswers) {
            clearInterval(timer);
            if (!showCorrectAnswers) {
                calculateScore();
            }
        }

        return () => clearInterval(timer);
    }, [timeLeft, showCorrectAnswers]);

    const handleAnswerChange = (index, e) => {
        if (timeLeft === 0 || showCorrectAnswers) return;
        const updatedAnswers = { ...answers };
        updatedAnswers[index] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const calculateScore = () => {
        let totalScore = 0;
        const results = questions.map((question, index) => {
            const isCorrect = question.correctAnswer === answers[index];
            if (isCorrect) totalScore += question.marks;
            return { question: question.question, isCorrect };
        });
        setScore(totalScore);
        setEvaluationResults(results);
    };

    const handleSubmit = () => {
        calculateScore();
        setShowCorrectAnswers(true);
        setSubmitDisabled(true);

        const quizData = { topic, name, email, dept, score, answers };
        axios.post('http://localhost:3001/api/quiz-results', quizData)
            .then(() => console.log('Quiz results saved successfully'))
            .catch(error => console.error('Error saving quiz results:', error));
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-4">{topic}</h1>
            <p>Time Left: {Math.floor(timeLeft / 60)} minutes {timeLeft % 60} seconds</p>
            {questions.map((question, index) => (
                <div key={index} className="mb-4">
                    <h3>{index + 1}. {question.question}</h3>
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="form-check">
                            <input
                                type="radio"
                                id={`option-${index}-${optionIndex}`}
                                name={`question-${index}`}
                                value={option}
                                checked={answers[index] === option}
                                className="form-check-input"
                                onChange={(e) => handleAnswerChange(index, e)}
                                disabled={showCorrectAnswers}
                            />
                            <label htmlFor={`option-${index}-${optionIndex}`} className="form-check-label">{option}</label>
                            {showCorrectAnswers && (
                                <span className={`ms-2 ${question.correctAnswer === option ? 'text-success' : 'text-danger'}`}>
                                    {question.correctAnswer === option ? 'Correct' : 'Wrong'}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <div>
                <button onClick={handleSubmit} className="btn btn-success" disabled={submitDisabled}>Submit</button>
                {showCorrectAnswers && (
                    <div className="mt-3">
                        <h4>Total Score: {score}</h4>
                        <button onClick={() => navigate('/dashboard', { state: { name, email, role, dept } })} className="btn btn-primary me-3">Go to Dashboard</button>
                    </div>
                )}
            </div>
            {showCorrectAnswers && (
                <div className="mt-3">
                    <h4>Question-wise Evaluation:</h4>
                    {evaluationResults.map((result, index) => (
                        <p key={index} className={`mb-1 ${result.isCorrect ? 'text-success' : 
                            'text-danger'}`}>
                            {result.question}: {result.isCorrect ? 'Correct' : 'Wrong'}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}