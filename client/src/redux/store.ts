import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import notesSlice from './slices/notesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notes: notesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
