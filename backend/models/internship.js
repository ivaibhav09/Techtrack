import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
    title: {
       type: String,
       required: [true, "Provide the internship title."],
       minLength: [3, "internship title must contain atleast 3 characters!"],
       maxLength: [50, "internship title cannot exceed 50 characters!"],
    },
    description: {
        type: String,
        required: [true, "Provide the internship description."],
        minLength: [3, "internship description must contain atleast 3 characters!"],
        maxLength: [250, "internship description cannot exceed 50 characters!"],
    },
    category: {
        type: String,
        required: [true, "internship category is required"]
    },
    country: {
        type: String,
        required: [true, "internship country is required"]
    },
    city: {
        type: String,
        required: [true, "internship city is required"]
    },
    location: {
        type: String || Number,
        required: [true, "please provide exact location"],
        minLength: [50, "internship location must contain atleast 50 characters"],
    },
    Salary: {
        type: Number || String,
        maxlength: [10, "Salary cannot exceed 10 digits"]
    },
    expired: {
        type: Boolean,
        default: false,
    },
    internshipPostedOn: {
        type: Date,
        default: Date.now,
    },
    PostedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },  
})

export const Internship = mongoose.model("Internship", internshipSchema);