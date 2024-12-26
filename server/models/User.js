// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String,
//     role: String,
//     dept: String,
//     phone: String,
// });

// const UserModel = mongoose.model("user_credentials", UserSchema);
// module.exports = UserModel;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Student", "Teacher"], required: true },
    dept: { type: String, required: true },
    phone: { type: String, required: true },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courses", // Reference to the Course model
        },
    ],
});

const UserModel = mongoose.model("user_credentials", UserSchema);
module.exports = UserModel;
