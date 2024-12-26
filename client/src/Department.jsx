import React, { useState, useEffect } from "react";
import axios from "axios";

const Department = () => {
    const [courses, setCourses] = useState([]);
    const [courseForm, setCourseForm] = useState({
        category: "",
        description: "",
        duration: "",
        instructorName: "",
        language: "",
        level: "",
        price: "",
        status: "active",
        visibility: "public",
    });
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch all courses
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/courses");
            setCourses(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch courses.");
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseForm({ ...courseForm, [name]: value });
    };

    const handleCreateCourse = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/courses", courseForm);
            setCourses([...courses, response.data]);
            setCourseForm({
                category: "",
                description: "",
                duration: "",
                instructorName: "",
                language: "",
                level: "",
                price: "",
                status: "active",
                visibility: "public",
            });
            setLoading(false);
        } catch (err) {
            setError("Failed to create course.");
            setLoading(false);
        }
    };

    const handleUpdateCourse = async () => {
        try {
            setLoading(true);
            const response = await axios.put(`/api/courses/${selectedCourse._id}`, courseForm);
            setCourses(courses.map((course) => (course._id === selectedCourse._id ? response.data : course)));
            setSelectedCourse(null);
            setCourseForm({
                category: "",
                description: "",
                duration: "",
                instructorName: "",
                language: "",
                level: "",
                price: "",
                status: "active",
                visibility: "public",
            });
            setLoading(false);
        } catch (err) {
            setError("Failed to update course.");
            setLoading(false);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`/api/courses/${id}`);
            setCourses(courses.filter((course) => course._id !== id));
            setLoading(false);
        } catch (err) {
            setError("Failed to delete course.");
            setLoading(false);
        }
    };

    const handleEditCourse = (course) => {
        setSelectedCourse(course);
        setCourseForm(course);
    };

    return (
        <div>
            <h1>Courses Management</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {/* Form for creating/updating course */}
            <div>
                <h2>{selectedCourse ? "Edit Course" : "Create Course"}</h2>
                <form>
                    <input type="text" name="category" placeholder="Category" value={courseForm.category} onChange={handleInputChange} />
                    <textarea name="description" placeholder="Description" value={courseForm.description} onChange={handleInputChange}></textarea>
                    <input type="number" name="duration" placeholder="Duration" value={courseForm.duration} onChange={handleInputChange} />
                    <input type="text" name="instructorName" placeholder="Instructor Name" value={courseForm.instructorName} onChange={handleInputChange} />
                    <input type="text" name="language" placeholder="Language" value={courseForm.language} onChange={handleInputChange} />
                    <input type="text" name="level" placeholder="Level" value={courseForm.level} onChange={handleInputChange} />
                    <input type="number" name="price" placeholder="Price" value={courseForm.price} onChange={handleInputChange} />
                    <select name="status" value={courseForm.status} onChange={handleInputChange}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select name="visibility" value={courseForm.visibility} onChange={handleInputChange}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <button type="button" onClick={selectedCourse ? handleUpdateCourse : handleCreateCourse}>
                        {selectedCourse ? "Update Course" : "Create Course"}
                    </button>
                </form>
            </div>

            {/* List of courses */}
            <h2>Courses List</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <h3>{course.category}</h3>
                        <p>{course.description}</p>
                        <button onClick={() => handleEditCourse(course)}>Edit</button>
                        <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Department;
