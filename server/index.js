import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';

import { authMe, login, register } from './controllers/UserController.js';
import {
    createNote,
    getAllNotes,
    getOneNote,
    removeNote,
    updateNote,
} from './controllers/NotesController.js';
import { authValidation } from './validation/validation.js';
import checkAuth from './utils/checkAuth.js';

const app = express();

app.use(express.json());
app.use(cors());

//auth
app.post('/api/register', authValidation, register);
app.post('/api/login', authValidation, login);
app.get('/api/auth', checkAuth, authMe);

//notes
app.get('/api/notes', checkAuth, getAllNotes);
app.get('/api/notes/:id', checkAuth, getOneNote);
app.post('/api/create', checkAuth, createNote);
app.delete('/api/notes/:id', checkAuth, removeNote);
app.patch('/api/notes/:id', checkAuth, updateNote);

const start = async () => {
    await mongoose
        .connect(config.get('mongoUri'))
        .then(() => console.log('Mongo DB connect'))
        .catch((err) => console.log('Mongo DB error:', err));

    app.listen(config.get('port'), () => {
        console.log(`Server has been started on port ${config.get('port')}`);
    });
};

start();
