import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  status: false,
  userData: {
    email: "",
    _id: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    }, //what we are doing is when user is logged in we are setting the status to true and setting the user data to the payload
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }, //and when the user logs out we are setting the status to false and setting the user data to null
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;