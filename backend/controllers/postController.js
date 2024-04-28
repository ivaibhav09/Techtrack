import cloudinary from 'cloudinary';
import { Comment, Post } from '../models/CommunityPost.js';
import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';

export const creatPost = catchAsyncError(async (req, res, next) => {
     const userId =  req.user._id;
    const { title, description } = req.body;
    

    if (!title || !description || !userId) {
        return next(new ErrorHandler("Please provide title and description", 400));
    }

    try {
        let userPostImage;
        if (req.files && req.files.image) {
            userPostImage = req.files.image[0].path;
            const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
            if (!allowedFormats.includes(req.files.image[0].mimetype)) {
                return next(new ErrorHandler("Invalid file type. Please upload in PNG, JPG, or JPEG format.", 400));
            }

            // Upload image to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(userPostImage);
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                console.error("Cloudinary Error:", cloudinaryResponse.error || "unknown cloudinary Error");
                return next(new ErrorHandler("Failed to upload image to Cloudinary.", 500));
            }

            userPostImage = cloudinaryResponse.secure_url;
        }

        const postResponse = new Post({
            title,
            description,
            userId,
            image: userPostImage, // Use the Cloudinary URL here
            
        });

        await postResponse.save();
        return res.status(200).send({
            success: true,
            message: "Post created successfully.",
            data: {
                title,
                description,
                userId,
                image: userPostImage,
            },
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).send({
            success: false,
            message: "Internal server error.",
        });
    }
});



export const getAllPost = async (req, res, next) => {
    try {
      // Get all posts from the database
      const allPosts = await Post.find({});
  
      // Check if there are no posts
      if (!allPosts || allPosts.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No posts found.",
        });
      }
      const postsWithComments = await Promise.all(
        allPosts.map(async (post) => {
          const comments = await Comment.find({ postId: post._id });
          return {
            ...post._doc,
            comments,
          };
        })
      );
      // Return the posts in the response
      return res.status(200).send({
        success: true,
        message: "All posts retrieved successfully.",
        allPosts: postsWithComments,
      });
    } catch (error) {
      console.error("Error getting all posts:", error);
      return res.status(500).send({
        success: false,
        message: "Internal server error.",
      });
    }
  };


  export const addComment = catchAsyncError(async(req, res, next) => {
    const userId  = req.user._id;
    const postId = await Post.findOne({ userId });
    
    const { comment } = req.body;
    const newComment = new Comment({
      userId,
      comment,
      postId,
    });
  
    const addedComment = await newComment.save();
    if (!addedComment) {
      return next(new ErrorHandler("Error in adding comment!", 500))
    }
  
    return res.status(201).send({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  
    // const post = await Post.findById(idValue);
    // console.log(post);
  });


