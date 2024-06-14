"use client"
import { configureStore } from "@reduxjs/toolkit";
import userRducer from "./UserSlice";

// config the store
const store = configureStore({
  reducer: {
    user: userRducer,
  },
});

// export default the store
export default store;
