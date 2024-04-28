import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      requird: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);

const CommentSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    },
    { timestamps: true }
  );
  
  export const Comment = mongoose.model("Comment", CommentSchema);