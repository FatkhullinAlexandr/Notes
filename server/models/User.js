import mongoose from 'mongoose';

const UserModel = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Note',
            },
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserModel);
