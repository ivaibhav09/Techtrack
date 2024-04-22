import express from "express"
import { isAuthorized } from '../middlewares/auth.js'
import {getAllJobs, postJob, updateJob, getMyJobs, deleteJob, getSingleJob } from '../controllers/jobController.js'

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getMyJobs);
router.put("/update/:id", isAuthorized, updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);

export default router;