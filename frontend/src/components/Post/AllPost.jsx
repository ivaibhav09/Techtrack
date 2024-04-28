
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import  {setposts}  from "../store/postSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";




const AllPost = () => {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/community/getallpost"
        );
        
        setAllPosts(response.data.allPosts);

        dispatch(setposts({ allPosts: response.data.allPosts }));
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    };

    fetchAllPosts();
  }, [dispatch]);

  // Check if allPosts is still a Promise, and return a loading state if it is
  if (allPosts instanceof Promise) {
    return <div>Loading...</div>;
  }

  // Now allPosts is an array, proceed with rendering
  return (
    
    <div>
      {allPosts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          description={post.description} // Corrected typo here
          image={post.image}
        />
      ))}
      
      <Link to={"/community/createpost"} onClick={() => setShow(false)}> <button className="create-post-btn">Ask Your Doubt</button> 
                </Link>
    </div>
  );
};

export default AllPost;
