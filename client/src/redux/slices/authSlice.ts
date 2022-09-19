import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAuthMe, fetchLogin, fetchRegister } from '../actions/auth';
import { IUserData } from '../../models/models';

interface AuthState {
    data: IUserData | null;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    data: null,
    loading: false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.loading = false;
            state.error = '';

            localStorage.removeItem('token');
        },
    },
    extraReducers: {
        [fetchRegister.pending.type]: (state) => {
            state.data = null;
            state.loading = true;
            state.error = '';
        },
        [fetchRegister.fulfilled.type]: (state, action: PayloadAction<IUserData>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = '';
        },
        [fetchRegister.rejected.type]: (state, action: PayloadAction<string>) => {
            state.data = null;
            state.loading = false;
            state.error = action.payload;
        },
        [fetchLogin.pending.type]: (state) => {
            state.data = null;
            state.loading = true;
            state.error = '';
        },
        [fetchLogin.fulfilled.type]: (state, action: PayloadAction<IUserData>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = '';
        },
        [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.data = null;
            state.loading = false;
            state.error = action.payload;
        },
        [fetchAuthMe.pending.type]: (state) => {
            state.data = null;
            state.loading = true;
            state.error = '';
        },
        [fetchAuthMe.fulfilled.type]: (state, action: PayloadAction<IUserData>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = '';
        },
        [fetchAuthMe.rejected.type]: (state, action: PayloadAction<string>) => {
            state.data = null;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
