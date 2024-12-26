const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kushagraagrawal9672:kabir0077@cluster0.cqs7v.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = mongoose;