import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Style/createpost.css"; // Import custom CSS file for styling

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Define image state
  const userId = useSelector((state) => state.auth.userData?._id);

  // Handler for handling image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handler for submitting the post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append('image', image);
  }
    formData.append("_id", userId);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/community/createpost",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      if (response.data.success) {
        navigate("/");
        // Reset form fields
        setTitle("");
        setDescription("");
        setImage(null); // Reset image state
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="create-post-container">
      <h2 className="create-post-heading">Create a New Post</h2>

      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="form-input"
            accept="image/png, image/jpeg, image/jpg, image/webp"
          />
        </div>

        <button type="submit" className="create-post-btn">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
