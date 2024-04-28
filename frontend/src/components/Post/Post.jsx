
import React from "react";
import { Link } from "react-router-dom";
import "../Style/post.css"; // Import the CSS file for custom styling

const Post = ({ id, title, description, image, descriptionClass = "" }) => {
  return (
    <div className="post-card">
      <div className="post-content">
        <div className="post-title">
          <Link
            to={`/post/:postId=${id}`}
            className="post-link"
          >
            {title}
          </Link>
        </div>
        <p
          className={`post-description ${descriptionClass}`}
        >
          {description}
        </p>
      </div>
      {image && (
        <img
          src={image}
          alt={title}
          className="post-image"
        />
      )}
    </div>
  );
};

export default Post;
