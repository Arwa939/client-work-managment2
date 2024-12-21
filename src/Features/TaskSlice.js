import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://work-management-server-ujgr.onrender.com/api/getSpecificTask");
        return response.data.Task;
    } catch (error) {
        return rejectWithValue("Failed to fetch tasks");
    }
});

// Async thunk for adding a new task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://work-management-server-ujgr.onrender.com/api/inserTask", {
            user: taskData.user,
            title: taskData.title,
            dueDate: taskData.dueDate,
            details: taskData.details,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue("Failed to add task");
    }
});

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://work-management-server-ujgr.onrender.com/api/tasks/${taskId}`);
            return { taskId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete task");
        }
    }
);

// Async thunk for updating a task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ id, taskData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://work-management-server-ujgr.onrender.com/api/updateTask/${id}`, taskData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update task");
        }
    }
);

const initialState = {
    Task: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};


const TaskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Task = action.payload;
                state.message = "Tasks fetched successfully";
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to fetch tasks";
            })
            // Add task
            .addCase(addTask.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Task.push(action.payload);
                state.message = action.payload.message || "Task added successfully";
            })
            .addCase(addTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to add task";
            })
            // Delete task
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.Task = state.Task.filter((task) => task._id !== action.payload.taskId);
                state.message = action.payload.message || "Task deleted successfully";
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to delete task";
            })
            // Update task
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.Task.findIndex((task) => task._id === action.payload.task._id);
                if (index !== -1) {
                    state.Task[index] = action.payload.task;
                }
                state.message = action.payload.message || "Task updated successfully";
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to update task";
            });
    },
});

export const { clearMessage } = TaskSlice.actions;
export default TaskSlice.reducer;
