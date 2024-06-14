"use client"
import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const UserSlice = createSlice({
    name: "user",
    initialState: {
    name: "Paresh",
    email: "john@gmail.com"
    },
    reducers: {
        updateName: (state, action) => {
        state.name = action.payload.name;
        },
        updateEmail: (state, action) => {
        state.email = action.payload.email;
        },
    },
});

export const {updateName, updateEmail} = UserSlice.actions;
export default UserSlice.reducer;
