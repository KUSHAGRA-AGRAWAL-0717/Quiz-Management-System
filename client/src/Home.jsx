import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student', dept: '', phone: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend validation for role
        if (!['Student', 'Teacher'].includes(formData.role)) {
            alert("Invalid role selected. Please choose either 'Student' or 'Teacher'.");
            return;
        }

        axios.post('http://localhost:3001/api/register', formData) // Ensure this URL is correct
            .then(result => {
                navigate('/dashboard', { state: result.data });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'password', 'dept', 'phone'].map((field) => (
                        <div className="mb-3" key={field}>
                            <label htmlFor={field}><strong>{field.charAt(0).toUpperCase() + field.slice(1)}</strong></label>
                            <input type={field === 'email' ? 'email' : 'text'} placeholder={`Enter ${field}`} name={field} className="form-control rounded-0" onChange={handleChange} required />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label htmlFor="role"><strong>Role</strong></label>
                        <select name="role" className="form-control rounded-0" value={formData.role} onChange={handleChange} required>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="mt-2">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
}
