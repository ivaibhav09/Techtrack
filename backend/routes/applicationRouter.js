import express, { Router } from "express";
import {employerGetAllApplications,studentGetAllApplications,postApplication , studentDeleteApplication} from '../controllers/applicationController.js';
import {isAuthorized} from "../middlewares/auth.js"

const router = express.Router();

router.get("/student/getall", isAuthorized, studentGetAllApplications);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.delete("/delete/:id", isAuthorized, studentDeleteApplication);
router.post("/post", isAuthorized, postApplication);

export default router;