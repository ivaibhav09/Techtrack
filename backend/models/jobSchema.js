import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
       type: String,
       required: [true, "Provide the job title."],
       minLength: [3, "Job title must contain atleast 3 characters!"],
       maxLength: [50, "Job title cannot exceed 50 characters!"],
    },
    description: {
        type: String,
        required: [true, "Provide the job description."],
        minLength: [3, "Job description must contain atleast 3 characters!"],
        maxLength: [250, "Job description cannot exceed 50 characters!"],
    },
    category: {
        type: String,
        required: [true, "job category is required"]
    },
    country: {
        type: String,
        required: [true, "job country is required"]
    },
    city: {
        type: String,
        required: [true, "job city is required"]
    },
    location: {
        type: String || Number,
        required: [true, "please provide exact location"],
        minLength: [30, "job location must contain atleast 50 characters"],
    },
    fixedSalary: {
        type: Number || String,
        maxlength: [10, "Salary cannot exceed 10 digits"]
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
      salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
      },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },  
})

export const Job = mongoose.model("Job", jobSchema);