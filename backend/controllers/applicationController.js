import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import {Application} from '../models/applicationSchema.js'
import cloudinary from 'cloudinary';

export const employerGetAllApplications = catchAsyncError(async(req, res, next)=>{
    const {role} = req.user;
    if(role === "Student"){
        return next(new ErrorHandler("Student is not allowed to access this resources!",
        400));
    }
    const {_id} = req.user;
    const applications = await Application.find({'employerID.user': _id});
    res.status(200).json({
        success: true,
        applications
    })
})

export const studentGetAllApplications = catchAsyncError(async(req, res, next)=>{
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources!",
        400));
    }
    const {_id} = req.user;
    const applications = await Application.find({'applicantID.user': _id});
    res.status(200).json({
        success: true,
        applications
    })
})

export const studentDeleteApplication = catchAsyncError(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources!",
        400));
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Oops, application not found", 404))
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted Successfully"
    })
});

export const postApplication = catchAsyncError(async(req, res, next)=>{
    const { role } = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources", 400));
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Resume File Required"));
    }
    const {resume} = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/webp"];
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid file type, Please upload in PNG , JPG or JPEG Format.", 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:", cloudinaryResponse.error || "unknown cloudinary Error");
        return next(new ErrorHandler("Failed to upload resume.", 500));
    }
    const {name, email, phone, jobId} = req.body;
    const applicantID={
        user: req.user._id,
        role: "Student"
    };
    if(!jobId){
        return next(new ErrorHandler("Job not found!", 404));
    }
    const jobDetails = await jobId.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found!",404));
    }

    const employerID={
        user: jobDetails.postedBy,
        role: "Employer",
    };
    if(!name || !email || !phone || !applicantID || !resume || !employerID ){
        return next(new ErrorHandler("Please fill all field!", 400))
    }
    const application = await Application.create({
        name, 
        email, 
        phone, 
        applicantID, 
        resume:{
            public_id: cloudinaryResponse.public_id,
            role: cloudinaryResponse.secure_url,
        } ,
        employerID
    })
    res.status(200).json({
        success: true,
        message: "Application Submitted",
        application,
    });
});