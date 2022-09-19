import mongoose from 'mongoose';

const NoteModel = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        text: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Note', NoteModel);
