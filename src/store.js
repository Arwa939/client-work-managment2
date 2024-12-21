import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Features/UserSlice";
import TaskReducer from "./Features/TaskSlice";

export const store = configureStore({
    reducer: {
        users: UserReducer,
        tasks: TaskReducer, 
    },
});
