import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INoteData } from '../../models/models';
import { createNote, fetchNotes, IUpdateNote, removeNote, updateNote } from '../actions/notes';

interface NotesState {
    items: INoteData[];
    loading: boolean;
    error: string;
}

const initialState: NotesState = {
    items: [],
    loading: false,
    error: '',
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNotes.pending.type]: (state) => {
            state.items = [];
            state.loading = true;
            state.error = '';
        },
        [fetchNotes.fulfilled.type]: (state, action: PayloadAction<INoteData[]>) => {
            state.items = action.payload.reverse();
            state.loading = false;
            state.error = '';
        },
        [fetchNotes.rejected.type]: (state, action: PayloadAction<string>) => {
            state.items = [];
            state.loading = false;
            state.error = action.payload;
        },
        [createNote.fulfilled.type]: (state, action: PayloadAction<INoteData>) => {
            state.items = [action.payload, ...state.items];
            state.loading = false;
            state.error = '';
        },
        [createNote.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [removeNote.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
            state.loading = false;
            state.error = '';
        },
        [removeNote.pending.type]: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateNote.pending.type]: (state) => {
            state.loading = true;
            state.error = '';
        },
        [updateNote.fulfilled.type]: (state, action: PayloadAction<IUpdateNote>) => {
            state.items = state.items.map((item) =>
                action.payload._id === item._id
                    ? { ...item, title: action.payload.title, text: action.payload.text }
                    : item,
            );
            state.loading = false;
            state.error = '';
        },
        [updateNote.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default notesSlice.reducer;
