const mongoose = require("mongoose");

const MarkSchema = new mongoose.Schema({
    topic: String,
    name: String,
    email: String,
    dept: String,
    score: Number,
    answers: Object,
});

const MarkModel = mongoose.model("mark_datas", MarkSchema);
module.exports = MarkModel;