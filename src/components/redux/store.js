import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import userReducer from './UserSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store