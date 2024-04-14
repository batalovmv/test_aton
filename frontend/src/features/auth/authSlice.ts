import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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


export default authSlice.reducer;