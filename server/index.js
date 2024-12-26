const express = require("express");
const cors = require("cors");
const mongoose = require("./db");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Use routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", quizRoutes);

// Start the Server
app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});