import NoteModel from '../models/Note.js';

export const createNote = async (req, res) => {
    try {
        const doc = new NoteModel({
            title: req.body.title,
            text: req.body.text,
            user: req.userId,
        });

        const note = await doc.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось создать заметку',
        });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const links = await NoteModel.find({ user: req.userId });

        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось получить заметки',
        });
    }
};

export const getOneNote = async (req, res) => {
    try {
        const link = await NoteModel.findById(req.params.id);

        res.json(link);
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось получить заметку',
        });
    }
};

export const removeNote = (req, res) => {
    try {
        const noteId = req.params.id;

        NoteModel.findOneAndDelete(
            {
                _id: noteId,
            },
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Не удалось удалить заметку',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Не удалось найти заметку',
                    });
                }

                res.json(noteId);
            },
        );
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось удалить заметку',
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        await NoteModel.updateOne(
            {
                _id: noteId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось обновить заметку',
        });
    }
};
