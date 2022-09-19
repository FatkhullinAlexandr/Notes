import axios from '../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserData } from '../../models/models';

interface AuthValues {
    email: string;
    password: string;
}

export const fetchRegister = createAsyncThunk(
    'auth/register',
    async (params: AuthValues, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<IUserData>('/register', params);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message); // error type
        }
    },
);

export const fetchLogin = createAsyncThunk(
    'auth/login',
    async (params: AuthValues, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<IUserData>('/login', params);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message); // error type
        }
    },
);

export const fetchAuthMe = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<IUserData>('/auth');
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message); // error type
    }
});
