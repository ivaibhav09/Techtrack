import { configureStore } from "@reduxjs/toolkit";

import postSlice from "./postSlice.js";
import authSlice from "./authSlice.js";

const store = configureStore({
  reducer: {
    post: postSlice,
    auth: authSlice,
  },
});

export default store;