import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addUser = createAsyncThunk("users/addUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://work-management-server-ujgr.onrender.com/api/insertUser", {
            user: userData.user,
            password: userData.password,
            email: userData.email,
            gender: userData.gender,
            imgUrl: userData.imgUrl,
            country: userData.country,
            city: userData.city,
            isp: userData.isp,
            timezone: userData.timezone,
            country_code: userData.country_code,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to add user");
    }
});

export const getUser = createAsyncThunk("users/getUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://work-management-server-ujgr.onrender.com/api/login", {
            password: userData.password,
            user: userData.user,
        });
        return response.data.user;
    } catch (error) {
        return rejectWithValue("Invalid Credentials");
    }
});

export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://work-management-server-ujgr.onrender.com/api/getUsers");
        return response.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch users");
    }
});



const initValue = {
    user: {},
    users: [],
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const UserSlice = createSlice({
    name: "users",
    initialState: initValue,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
        logoutUser: (state) => {
            state.user = {}; // Clear user state
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // addUser cases
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // getUser cases
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false; // Clear previous errors
                state.isSuccess = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // getUsers cases
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetState,logoutUser  } = UserSlice.actions;
export default UserSlice.reducer;
