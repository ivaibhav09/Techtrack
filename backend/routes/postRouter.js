import express from "express";
import { creatPost, getAllPost, addComment } from "../controllers/postController.js"; 
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createpost",isAuthorized, creatPost);
router.get("/getallpost", getAllPost);
router.post("/addcomment",isAuthorized, addComment);

export default router;