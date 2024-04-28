import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import "../Style/PostAllStyle.css";

const postAll = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const postState = useSelector((state) => state.post.allPosts);
  const loggedInStatus = useSelector((state) => state.auth.status);
  const clickedPostId = postId.split("=")[1];
  const currentPost =
    postState.find((post) => post._id === clickedPostId) || {};

  // Dummy data for post and comments
  const postContent = currentPost.title || "Loading...";
  const postImage = currentPost.image || "";
  const postComments = currentPost.comments || [];

  // State for comments
  const [comments, setComments] = useState(postComments);

  // State for new comment input
  const [newComment, setNewComment] = useState("");

  // Handler for adding a new comment
  const addComment = async () => {
    try {
      console.log(loggedInStatus);
      if (!loggedInStatus) {
        alert("Please login first");
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "https://devi-community-forum-server.onrender.com/api/v1/user/addcomment",
        {
          postId: currentPost._id,
          comment: newComment,
          userId: clickedPostId,
        }
      );
      console.log(currentPost._id, clickedPostId);
      console.log(response.data); // Log the response if needed

      // Add the new comment to the comments state
      setComments([...comments, { comment: newComment }]);
      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  function convertToSimpleDateTime(timestamp) {
    const date = new Date(timestamp);

    // Get year, month, and day
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    // Get hours, minutes, and AM/PM indicator
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format hours, minutes, and day with leading zeros if needed
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDay = day < 10 ? `0${day}` : day;

    // Format month with leading zero if needed
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Construct the date and time string with AM/PM
    const simpleDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes} ${ampm}`;

    return simpleDateTime;
  }

  return (
    <div className="post-container">
      {/* Post Content */}
      <div>
        <img
          src={postImage}
          alt="Post Image"
          className="post-image"
        />
        <p className="post-title">
          {postContent}
        </p>
        <p className="post-content">
          {postContent}
        </p>
        <div className="post-date">
          <p>
            {convertToSimpleDateTime(currentPost.createdAt)}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2 className="comments-heading">Comments</h2>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={nanoid()} className="comment-item">
              {comment.comment}
            </li>
          ))}
        </ul>
        <div className="comment-input-container">
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="add-comment-btn"
            onClick={addComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default postAll;
