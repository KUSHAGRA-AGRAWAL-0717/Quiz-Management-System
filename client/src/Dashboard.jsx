import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Teacher from './pages/Teacher';
import Student from './pages/Student';
import Department from './Department';

export default function Dashboard() {
    const { state } = useLocation();
    const { name, dept, role } = state;
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center dashboard-container">
                <h1>Welcome {name}</h1>
                <h2 className="mb-4">Department: {dept}</h2>

                {/* Conditionally render Teacher, Student, or Department component based on role */}
                {role === "Teacher" ? (
                    <Teacher state={state} />
                ) : role === "Department" ? (
                    <Department state={state} /> // Pass state to Department correctly
                ) : (
                    <Student state={state} />
                )}

                <button onClick={() => navigate('/home')} className="btn btn-danger">Logout</button>
            </div>
        </div>
    );
}
