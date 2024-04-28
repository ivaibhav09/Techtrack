import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide your name!"],
        minLength: [3, "Name must contain atleast 3 character!"],
        maxLength: [30, "Name cannot exceed 30 character!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email!"],
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    phone: {
        type: Number,
        required: [true, "Please provide your phone number."],
    },
    password: {
        type: String,
        required: [true, "Please provide your password!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
        select: false,
        validate: {
            validator: function(value) {
                // Regular expression to check for the presence of at least one special character
                return /[!@#$%^&*]/.test(value);
            },
            message: "Use special characters in your password!"
        }
    },
    role:{
       type: String,
       required: [true, "Please provide ypur role"],
       enum: ["Student", "Employer"],
    },   
    createdAt:{
        type: Date,
        default: Date.now,
    }, 
});

//hashing the password

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//comparing password

userSchema.methods.comparePassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

// generating a JWT Authorization

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema);