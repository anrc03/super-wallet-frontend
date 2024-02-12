import { createSlice } from '@reduxjs/toolkit'
import React from 'react'


const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null;
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }
})

export default UserSlice.reducer;
export const { login, logout } = UserSlice.actions;
export const selectUser = (state) => state.user.user;