import express  from "express";
import {getAllInternship} from '../controllers/internshipController.js'

const router = express.Router();
router.get("/getallintern", getAllInternship);

export default router;