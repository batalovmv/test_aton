import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticate } from '../../services/api';
import { LoginParams, User } from './types';


interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

export const login = createAsyncThunk<User, LoginParams, { rejectValue: string }>(
    'auth/login',
    async ( loginParams , { rejectWithValue }) => {
        try {
            const data = await authenticate(loginParams);
            return data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Unknown error");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.fullName;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;