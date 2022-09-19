import axios from '../../axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { INoteData } from '../../models/models';

export const fetchNotes = createAsyncThunk('notes/getAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<INoteData[]>('/notes');
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message);
    }
});

interface INoteValues {
    title: string;
    text: string;
}

export const createNote = createAsyncThunk(
    'notes/create',
    async (note: INoteValues, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<INoteData>('/create', note);
            return data;
        } catch (error) {
            return rejectWithValue('Не удалось создать заметку');
        }
    },
);

export const removeNote = createAsyncThunk(
    '/notes/remove',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete<string>(`/notes/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue('Не удалсь удалить заметку');
        }
    },
);

export interface IUpdateNote {
    _id: string;
    title: string;
    text: string;
}

export const updateNote = createAsyncThunk(
    '/notes/update',
    async (note: IUpdateNote, { rejectWithValue }) => {
        try {
            await axios.patch(`/notes/${note._id}`, note);
            return note;
        } catch (error) {
            return rejectWithValue('Не удалсь обновить заметку');
        }
    },
);
