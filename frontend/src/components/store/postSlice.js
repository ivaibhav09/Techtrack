import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  status: false,
  allPosts: [
    {
      _id: "",
      title: "",
      discription: "",
      image: "",
      userId: "",
      createdAt: "",
      updatedAt: "",
      _v: "",
    },
  ],
};

const postSlice = createSlice({
  name: "post",
  initialState: initalState,
  reducers: {
    setposts: (state, action) => {
      state.status = true;
      state.allPosts = action.payload.allPosts;
    }, //what we are doing is when user is logged in we are setting the status to true and setting the user data to the payload
  },
});

export const  { setposts}   = postSlice.actions;

export default postSlice.reducer;