import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import {Internship} from '../models/internship.js'

export const getAllInternship = catchAsyncError(async(req, res, next) => {
    const jobs = await Internship.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    });
});
